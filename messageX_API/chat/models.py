# models.py
from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class DirectConversation(models.Model):
    # enforce unordered pair uniqueness via ordering (a < b)
    user_a = models.ForeignKey(User, on_delete=models.CASCADE, related_name="conv_as_a")
    user_b = models.ForeignKey(User, on_delete=models.CASCADE, related_name="conv_as_b")

    created_at = models.DateTimeField(auto_now_add=True)
    # denormalized for fast list screens
    last_message = models.ForeignKey("Message", null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    last_message_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(user_a__lt=models.F("user_b")), name="user_a_lt_user_b"),
            models.UniqueConstraint(fields=["user_a", "user_b"], name="uniq_direct_pair"),
        ]
        indexes = [
            models.Index(fields=["user_a", "last_message_at"]),
            models.Index(fields=["user_b", "last_message_at"]),
        ]

    def participants(self):
        return (self.user_a_id, self.user_b_id)


class Message(models.Model):
    conversation = models.ForeignKey(DirectConversation, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_messages")

    # plaintext content for now
    content = models.TextField()                      # for text
    content_type = models.CharField(max_length=50, default="text/plain")  # extend later for richer types
    reply_to = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL, related_name="replies")

    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)  # set when pushed/pulled by receiver
    read_at = models.DateTimeField(null=True, blank=True)       # set when receiver opens

    class Meta:
        ordering = ["id"]  # monotonic
        indexes = [
            models.Index(fields=["conversation", "id"]),
            models.Index(fields=["sender", "id"]),
        ]
