import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

const firebaseConfig = {
    apiKey: "AIzaSyA54wUzCs3Q5RedV2CLBN9IDRH3y-Lhlp0",
    authDomain: "svelte-example-a993a.firebaseapp.com",
    projectId: "svelte-example-a993a",
    storageBucket: "svelte-example-a993a.appspot.com",
    messagingSenderId: "761018585262",
    appId: "1:761018585262:web:098cdda3ddd3ee69989d3f"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

function userStore() {
    let unsubscribe: () => void

    if (!auth || !globalThis.window) {
        console.warn('Firebase Auth not initialized, or not in browser');
        const { subscribe } = writable<User | null>(null);
        return {
            subscribe
        }
    }

    const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
            set(user);
        })
        return () => unsubscribe();
    })
    return {
        subscribe
    }
}

export const user = userStore();