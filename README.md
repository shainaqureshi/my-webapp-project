# 🎯 Share Your Goals - Goal Tracking Web App

A social goal-tracking web application built with React.js and Firebase. Set, track, and share your weekly goals across four life categories: Intellectual, Emotional, Social, and Physical.

## ✨ Features

- 🔐 **Google Authentication** - Secure sign-in with Google
- 📝 **Goal Management** - Create, edit, and delete goals
- 🎨 **Four Goal Categories**:
  - 🧠 Intellectual
  - 💗 Emotional
  - 🤝 Social
  - 💪 Physical
- 🌐 **Public Feed** - View all public goals from the community
- 👥 **Find Users** - Discover other users in the community
- 🔒 **Privacy Controls** - Set goals as public or private
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Firebase account

### Installation

1. **Clone the repository**
   ```bash
   cd my-webapp-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**

   a. Go to [Firebase Console](https://console.firebase.google.com/)
   
   b. Create a new project (or select an existing one)
   
   c. Enable **Google Authentication**:
      - Go to Authentication → Sign-in method
      - Enable Google as a sign-in provider
   
   d. Create a **Firestore Database**:
      - Go to Firestore Database → Create database
      - Start in production mode
      - Choose a location
   
   e. Get your Firebase configuration:
      - Go to Project Settings → General
      - Scroll down to "Your apps" and click the web icon (</>)
      - Copy the configuration object

4. **Configure Firebase in your app**

   Open `src/firebase/config.js` and replace the placeholder values with your Firebase configuration:

   ```javascript
   export const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

5. **Set up Firestore Security Rules**

   Go to Firestore Database → Rules and add these rules:

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Goals collection
       match /goals/{goalId} {
         // Allow users to read public goals
         allow read: if resource.data.isPublic == true || request.auth.uid == resource.data.userId;
         // Allow users to create their own goals
         allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
         // Allow users to update/delete their own goals
         allow update, delete: if request.auth.uid == resource.data.userId;
       }
       
       // Users collection
       match /users/{userId} {
         // Anyone can read user profiles
         allow read: if true;
         // Users can only write their own profile
         allow write: if request.auth.uid == userId;
       }
     }
   }
   ```

6. **Start the development server**
   ```bash
   npm start
   ```

   The app will open in your browser at `http://localhost:3000`

## 📖 Usage

### Sign In
- Click "Sign in with Google" on the login page
- Authorize the application

### Create a Goal
1. Navigate to "My Goals"
2. Click "+ Add New Goal"
3. Select a category (Intellectual, Emotional, Social, or Physical)
4. Enter your goal title and description
5. Choose public or private visibility
6. Click "Create Goal"

### Edit/Delete Goals
- Click the ✏️ icon to edit a goal
- Click the 🗑️ icon to delete a goal

### View Public Goals
- Go to "Feed" to see all public goals from the community
- Use category filters to narrow down goals

### Find Users
- Go to "Find Users" to discover other users
- Use the search bar to find specific users

## 🛠️ Built With

- **React.js** - Frontend framework
- **Firebase Authentication** - User authentication
- **Cloud Firestore** - NoSQL database
- **React Router** - Client-side routing
- **CSS3** - Styling

## 📁 Project Structure

```
my-webapp-project/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Feed.js
│   │   ├── FindUsers.js
│   │   ├── GoalCard.js
│   │   ├── GoalForm.js
│   │   ├── Login.js
│   │   ├── MyGoals.js
│   │   ├── Navbar.js
│   │   └── [CSS files]
│   ├── context/
│   │   └── AuthContext.js
│   ├── firebase/
│   │   ├── config.js
│   │   ├── firebase.js
│   │   └── firestore.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎨 Using GitHub Copilot

This project is optimized for GitHub Copilot! Here are some tips:

### 1. **Add New Features**
   ```javascript
   // Add a like button to goals
   // GitHub Copilot will suggest the implementation
   ```

### 2. **Create Helper Functions**
   ```javascript
   // Function to calculate weekly goal completion rate
   // Copilot will generate the logic
   ```

### 3. **Add Comments for Suggestions**
   ```javascript
   // TODO: Add notification system
   // TODO: Implement goal progress tracking
   // TODO: Add profile customization
   ```

### 4. **Refactor Code**
   - Highlight code and ask Copilot to optimize it
   - Ask for performance improvements
   - Request accessibility enhancements

## 🚀 Deployment

### Deploy to Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set `build` as your public directory
   - Configure as a single-page app: Yes
   - Don't overwrite index.html

4. **Build the app**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   firebase deploy
   ```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- React community for excellent documentation
- GitHub Copilot for development assistance

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check Firebase documentation: https://firebase.google.com/docs
- Visit React documentation: https://react.dev

---

**Happy Goal Tracking! 🎯**