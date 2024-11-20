import string 
from random import randint
def genToken():
    alphabet = string.ascii_letters+string.digits 
    result   = ""
    for _ in range(5):
        result += alphabet[randint(0, len(alphabet)-1)]
    return result