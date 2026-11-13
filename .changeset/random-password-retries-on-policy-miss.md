---
'@rocket.chat/meteor': patch
---

Fixes random password generation failing when a candidate does not meet the password policy, instead of retrying.
