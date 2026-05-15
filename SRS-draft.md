PROBLEM STATEMENT
Most internet users create weak, predictable passwords because they lack immediate, understandable feedback about password security at the point of creation. Furthermore, millions of passwords have been exposed in public data breaches and continue to circulate among malicious actors — yet ordinary users have no simple way to check whether their chosen password has already been compromised.
Existing tools that address these problems are either scattered across multiple platforms, overly technical for general users, or fail to implement privacy-preserving techniques when checking breached credentials.
This project addresses both problems in a single, accessible, responsive web application — providing real-time password strength analysis and privacy-safe breach detection in one unified interface.

FUNCTIONAL REQUIREMENTS
IDRequirementFR-01The system shall analyse password strength in real time as the user types
FR-02The system shall display a visual strength indicator (progress bar + label)FR-03The system shall show specific feedback explaining why a password is weak
FR-04The system shall display an estimated time-to-crack for the entered password
FR-05The system shall check whether a password appears in known breach databases
FR-06The system shall implement k-Anonymity when communicating with the HIBP API
FR-07The system shall allow users to register and create an account
FR-08The system shall allow registered users to log in and log out securely
FR-09The system shall save breach check history for logged-in users
FR-10The system shall allow users to view their past breach check history
FR-11The system shall allow users to toggle password visibility
FR-12The system shall work correctly on both mobile and desktop screen sizes

NON-FUNCTIONAL REQUIREMENTS
IDRequirement
NFR-01The password strength analysis shall respond within 100 milliseconds of user input
NFR-02The application shall never transmit a raw password to any external server
NFR-03All user passwords shall be hashed using bcrypt before storage
NFR-04Authentication tokens shall expire after 7 days
NFR-05The application shall be usable on screens as small as 320px wide
NFR-06The backend API shall implement rate limiting to prevent abuse
NFR-07All API communication shall use HTTPS in production
NFR-08The application shall load within 3 seconds on a standard connection