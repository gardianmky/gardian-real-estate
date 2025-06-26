import pandas as pd
from email_validator import validate_email, EmailNotValidError

def clean_emails(input_file, output_file):
    # Load the CSV file
    df = pd.read_csv(input_file)

    # Automatically detect the email column (assuming it's named 'email')
    if 'email' not in df.columns:
        raise ValueError("No 'email' column found in the CSV file.")

    # Define a function to clean and validate emails
    def clean_email(email):
        try:
            email = email.strip().lower()  # Convert to lowercase and strip whitespace
            email = email.replace(" ", "")  # Remove spaces
            email = email.replace("..", ".")  # Fix multiple dots
            validate_email(email)  # Validate email
            return email
        except (EmailNotValidError, ValueError):
            return None  # Return None for invalid emails

    # Apply the cleaning function to the email column
    df['cleaned_email'] = df['email'].apply(clean_email)

    # Remove duplicates and invalid emails
    df_cleaned = df.dropna(subset=['cleaned_email']).drop_duplicates(subset=['cleaned_email'])

    # Sort the results
    df_cleaned = df_cleaned.sort_values(by='cleaned_email')

    # Save the cleaned data to a new CSV file
    df_cleaned.to_csv(output_file, index=False)

    # Print a summary of changes made
    print(f"Original email count: {len(df)}")
    print(f"Cleaned email count: {len(df_cleaned)}")
    print("Cleaning completed successfully.")

if __name__ == "__main__":
    input_csv = 'input.csv'  # Change to your input file name
    output_csv = 'output.csv'  # Change to your desired output file name
    clean_emails(input_csv, output_csv)
