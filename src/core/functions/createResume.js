import { doc, setDoc, collection, updateDoc, getDoc } from "firebase/firestore";
import { db } from '../../services/firebase';
import { FIRESTORE_PATH_NAMES } from "../utils/constants";

export const createResume = async ( uid, resumeId, resumeData ) => {
    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
    const resumeRef = doc(collection(userRef, FIRESTORE_PATH_NAMES.RESUMES), resumeId);

    try{
        const userSnap = await getDoc(userRef);
        if(!userSnap.exists()){
            await setDoc(userRef, {userId: uid}, {merge: true});
        }

        await setDoc(resumeRef, resumeData);
    }catch(error){
        console.error("Error creating resume document:", error);
    }
};
