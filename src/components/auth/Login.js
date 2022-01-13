import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, getRedirectResult, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import facebook from '../../assets/icons/facebook.png';
import google from '../../assets/icons/google.png';
import { userLogin } from '../../redux/actions/authActions';
import { firebaseConfig } from "./firebase.config";
import './Login.css';



const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
auth.languageCode = 'it'

async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}


const Login = () => {
    // const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);

    // for react router dom

    let navigate = useNavigate();
    let history = useNavigate();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
        auth.signin(() => {
            history.replace(from);
        });
    };
    navigate(from, { replace: true });

    // end

    const dispatch = useDispatch()
    const state = useSelector(state => state.auth)
    console.log(state)




    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
    });

    const handleChange = (e) => {
        let isFieldValid = true;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passWordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passWordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            console.log(newUserInfo)
        }
    };

    const handleSubmit = (e) => {
        console.log(newUser, user.email, user.password)
        if (newUser && user.email && user.confirmPassword) {
            console.log('Hello World');
            createUserWithEmailAndPassword(auth, user.email, user.confirmPassword)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    dispatch(userLogin(res.user))
                    console.log(res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    dispatch(userLogin(res.user))
                    console.log(...res.user)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    console.log(error)
                });
        }
        e.preventDefault();
    };

    console.log(user)

    // const updateUserInfo = (name) => {
    //     const user = firebase.auth().currentUser;
    //     user
    //         .updateProfile({
    //             displayName: name,
    //         })
    //         .then(function () {
    //             console.log("User Name Updated Successfully");
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const handleSocialSignIn = (e) => {
        if (e === 'google') {
            signInWithPopup(auth, googleProvider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    dispatch(userLogin({
                        isSignedIn: true,
                        accessToken: user.accessToken,
                        refreshToken: user.stsTokenManager.refreshToken,
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL
                    }))
                    console.log(user)
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });

            getRedirectResult(auth)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access Google APIs.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;

                    // The signed-in user info.
                    const user = result.user;
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });

        } else if (e === 'facebook') {
            signInWithPopup(auth, facebookProvider)
                .then((result) => {
                    // The signed-in user info.
                    const user = result.user;
                    console.log(user)
                    dispatch(userLogin({
                        isSignedIn: true,
                        accessToken: user.accessToken,
                        refreshToken: user.stsTokenManager.refreshToken,
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL
                    }))

                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    const credential = FacebookAuthProvider.credentialFromResult(result);
                    const accessToken = credential.accessToken;

                    // ...
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential = FacebookAuthProvider.credentialFromError(error);

                    // ...
                });

            getRedirectResult(auth)
                .then((result) => {
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    const credential = FacebookAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;

                    const user = result.user;
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // AuthCredential type that was used.
                    const credential = FacebookAuthProvider.credentialFromError(error);
                    // ...
                });
        }
    };





    // const storeAuthToken = () => {
    //     firebase
    //         .auth()
    //         .currentUser.getIdToken(/* forceRefresh */ true)
    //         .then(function (idToken) {
    //             sessionStorage.setItem("token", idToken);
    //         })
    //         .catch(function (error) {
    //             // Handle error
    //         });
    // };

    return (
        <div>
            <div>
                <form className="login-form" onSubmit={handleSubmit}>
                    {newUser ? (
                        <h6 className="logIn-signIn">Create New User</h6>
                    ) : (
                        <h6 className="logIn-signIn">Log In</h6>
                    )}
                    {newUser && (
                        <input
                            onBlur={handleChange}
                            className="main-input"
                            type="text"
                            name="name"
                            placeholder="Name"
                            id=""
                        />
                    )}
                    <input
                        onBlur={handleChange}
                        className="main-input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        id=""
                    />

                    <input
                        onBlur={handleChange}
                        className="main-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        id=""
                    />

                    {newUser && (
                        <input
                            onBlur={handleChange}
                            className="main-input"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            id=""
                        />
                    )}

                    {newUser || (
                        <div className="remember-forget-password">
                            <input type="checkbox" name="rememberMe" id="" />
                            <label htmlFor="rememberMe">Remember Me</label>
                            <a className="forget-password" href="#">
                                Forget Password
                            </a>
                        </div>
                    )}

                    <input
                        className="submit-input"
                        type="submit"
                        value={newUser ? "Create an Account" : "Login"}
                    />
                    <span className="have-account">
                        <h5>Don't Have an Account?</h5>
                        <a
                            onClick={() => setNewUser(!newUser)}
                            className="create-account"
                            href="#"
                        >
                            {newUser ? <h5>Log In</h5> : <h5>Create an Account</h5>}
                        </a>
                    </span>
                </form>
                <span className="this">Or</span>
                <div className="social-main">
                    <div
                        onClick={() => handleSocialSignIn('facebook')}
                        className="loginWith-social facebook"
                    >
                        <img src={facebook} alt="" />
                        <h5>Log In With Facebook</h5>
                    </div>
                    <div
                        onClick={() => handleSocialSignIn('google')}
                        className="loginWith-social google"
                    >
                        <img src={google} alt="" />
                        <h5>Log In With Google</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;