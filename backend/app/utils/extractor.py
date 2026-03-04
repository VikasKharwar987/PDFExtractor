import re


def extract_certificate_info(text):

    title = None
    issue_date = None
    expire_date = None

    issue_pattern = r"(Issued|Issue Date)[: ]+([A-Za-z0-9, ]+)"
    expire_pattern = r"(Expire|Expiry|Expiration)[: ]+([A-Za-z0-9, ]+)"

    issue_match = re.search(issue_pattern, text, re.IGNORECASE)
    expire_match = re.search(expire_pattern, text, re.IGNORECASE)

    if issue_match:
        issue_date = issue_match.group(2)

    if expire_match:
        expire_date = expire_match.group(2)

    # try to guess title from first meaningful line
    lines = text.split("\n")

    for line in lines:
        if len(line.strip()) > 6:
            title = line.strip()
            break

    return {
        "title": title,
        "issue_date": issue_date,
        "expire_date": expire_date
    }