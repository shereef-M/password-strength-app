# PassGuard — User Manual

**Version:** 1.0  
**Date:** June 2026  
**Author:** Abuabakar Muhammad Sherif, Madu-Uwechie Chukwunonso Noel, Adriel Madukwe Ogbureke, Stefan Birch Olufikayo
**Course:** WEB APPLICATION DEVELOPMENT (SEN 302)
**Institution:** Nile University of Nigeria


## 1. Introduction
PassGuard is a free web application that checks how strong your password is and whether it has been exposed in a known data breach. It works on any device — phone, tablet, or computer — and requires no installation.

Your password is never stored or sent anywhere in readable form. Everything is designed with your privacy in mind.

## 2. Accessing the Application
Open any web browser and go to:
https://passguard-three.vercel.app 


## 3. Checking Password Strength

1. On the homepage, click the password input field
2. Type or paste any password
3. The strength bar and feedback appear automatically as you type

**What you will see:**

Color | Strength | Meaning 
Red | Very Weak | Crackable instantly 
Orange | Weak | Crackable in seconds 
Yellow | Fair | Crackable in hours 
Blue | Strong | Would take months 
Green | Very Strong | Would take centuries 

Below the bar you will also see:
- The estimated time to crack the password
- Warnings about common or predictable patterns
- Suggestions on how to make it stronger

## 4. Generating a Strong Password
Click the **refresh icon** inside the input field to instantly generate a random strong 16-character password. Copy it and save it somewhere safe.

## 5. Showing or Hiding Your Password
Click the **eye icon** inside the input field to toggle between showing and hiding your password.

## 6. Checking for Data Breaches
1. Type a password into the input field
2. Click the green **Check for Data Breaches** button
3. Wait a few seconds for the result

**If breached:**
A red box appears showing how many times the password was found in known data breaches. Stop using this password immediately.

**If not breached:**
A green box appears confirming the password was not found in any known breach database.

Your password is never sent to any external server. PassGuard uses a privacy technique called k-Anonymity to perform the check safely.


## 7. Creating an Account
An account lets you save your breach check history.

1. Click **Sign Up** in the navigation bar
2. Enter a username, email address, and password
3. Click **Create account**
4. You will be logged in automatically

## 8. Logging In

1. Click **Login** in the navigation bar
2. Enter your email and password
3. Click **Sign in**

You will stay logged in for 7 days automatically.

## 9. Viewing Check History

1. Log in to your account
2. Click **History** in the navigation bar
3. All your previous breach checks are listed with timestamps 
   and results

Your password is shown in masked form for example `s*********3` so you can recognise it without PassGuard storing the real password.

## 10. Deleting a History Record

On the History page click the **trash icon** on any record to delete it permanently.

## 11. Logging Out

Click **Logout** in the navigation bar to end your session. Always log out when using a shared device.

## 12. Troubleshooting

Problem | Solution 
Breach check fails | Check your internet connection and try again 
Cannot log in | Check your email and password are correct 
History not showing | Make sure you were logged in when you checked 
Page looks broken | Refresh the page or try a different browser 

## 13. Privacy Summary

- Your password is never stored in any readable form
- Breach checking uses k-Anonymity — your password never leaves your device
- Your login password is encrypted using bcrypt
- PassGuard does not share your data with any third parties

*PassGuard User Manual — Version 1.0 — June 2026*
