import re

def validate_email(email):
    """
    Validate email format using regex.

    Args:
        email (str): Email address to validate.

    Returns:
        bool: True if email is valid, False otherwise.
    """
    email_regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return bool(re.match(email_regex, email))

def validate_username(username):
    """
    Validate username: 3-20 chars, alphanumeric + underscore, must start with letter.

    Args:
        username (str): Username to validate.

    Returns:
        bool: True if username is valid, False otherwise.
    """
    return 3 <= len(username) <= 20 and username.isalnum() and username[0].isalpha() and '_' in username

def validate_password(password):
    """
    Validate password: min 8 chars, at least 1 uppercase, 1 lowercase, 1 digit.

    Args:
        password (str): Password to validate.

    Returns:
        bool: True if password is valid, False otherwise.
    """
    return (len(password) >= 8 and 
            any(c.isupper() for c in password) and 
            any(c.islower() for c in password) and 
            any(c.isdigit() for c in password))

def validate_registration_data(email, username, password):
    """
    Validate user registration data.

    Args:
        email (str): Email address.
        username (str): Username.
        password (str): Password.

    Returns:
        dict: Dictionary with keys 'is_valid' (bool) and 'errors' (list of str).
    """
    errors = []
    if not validate_email(email):
        errors.append("Invalid email format")
    if not validate_username(username):
        errors.append("Invalid username: must be 3-20 chars, alphanumeric + underscore, start with letter")
    if not validate_password(password):
        errors.append("Invalid password: must be at least 8 chars, at least 1 uppercase, 1 lowercase, 1 digit")
    return {'is_valid': not errors, 'errors': errors}

if __name__ == '__main__':
    print(validate_registration_data('test@example.com', 'test_user', 'TestPassword123'))
    print(validate_registration_data('invalid_email', 'test_user', 'TestPassword123'))
    print(validate_registration_data('test@example.com', 'invalid_username', 'TestPassword123'))
    print(validate_registration_data('test@example.com', 'test_user', 'invalid_password'))