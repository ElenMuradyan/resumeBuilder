import { doc, setDoc, collection } from "firebase/firestore";
import { db } from '../../services/firebase';
import { FIRESTORE_PATH_NAMES } from "../utils/constants";

export const createResume = async ( uid, resumeId, resumeData ) => {
    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
    const resumeRef = doc(collection(userRef, FIRESTORE_PATH_NAMES.RESUMES), resumeId);
    const resumeDoc = resumeData;

    try{
        await setDoc(resumeRef, resumeDoc);
    }catch(error){
        console.error("Error creating quiz document:", error);
    }
};


export const saveProfileToFirestore = async ( uid, resumeId, section, values ) => {
try{ 
    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
    const resumeRef = doc(userRef, FIRESTORE_PATH_NAMES.RESUMES, resumeId);

    await setDoc(resumeRef, {
            [section]: values,
        }, {merge: true});
    }catch(error){
        console.error("Error adding question:", error);
    }
};