![URMC Banner](https://github.com/user-attachments/assets/977c5776-254b-41a8-829d-8d52a864b79b)

# HDBookMarks 4.0

A web application that provides useful information to service desk agents. Allowing for faster searching for information rather than having to open multiple application to gather information on a call. 


## Usage

### Frontend

Nothing changes from the original version of HDBookMarks. Hosted as static html files on share drive and will just need to be open to view the application.

### Backend

Backend will be a go server. That will prompt for credentials when running the binary exe, once the credential are verified the server will start. Then all the communication between the frontend and backend will work normally.


## Features

### Active Directory
#### Users
- Search for users (Type in username | First and last name to see users that match)
- Get information about a particular user (location, AD groups they apart of)
#### Share Drives
- Find a share drive based name,server,AD group (Not needed the use of DMD)
- Get the information about a AD group with one click after find the share drive for access
#### Groups
- Get all the members of a Group (limitation for groups with larger number of people)
- Get information about an AD group
#### Computers
- Search for computer by name and pulls all computer that match the search
- Gather information about the computer that a agent would need

### Booksmarks
- Now allowing for the ability to add bookmarks and remove book marks based on the agents preference
- Re-model of that page to make finding information easier
- Search will be change to filter better
- Implementing page based loading
- Favorite bookmarks so that they will always be at the top of the list
- New Pages for the Active Directory features 
