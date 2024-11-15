import { doc, setDoc, collection, updateDoc, getDoc } from "firebase/firestore";
import { db } from '../../services/firebase';
import { FIRESTORE_PATH_NAMES } from "../utils/constants";
import { notification } from "antd";

export const createResume = async ( uid, resumeId, resumeData ) => {
    console.log(uid)
    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
    const resumeRef = doc(collection(userRef, FIRESTORE_PATH_NAMES.RESUMES), resumeId);

    try{
        const userSnap = await getDoc(userRef);
        if(!userSnap.exists()){
            await setDoc(userRef, {userId: uid}, {merge: true});
        }

        await setDoc(resumeRef, resumeData);
    }catch(error){
        console.error("Error creating quiz document:", error);
    }
};


export const saveProfileToFirestore = async ( uid, resumeId, section, values ) => {
        try{ 
            const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
            const resumeRef = doc(userRef, FIRESTORE_PATH_NAMES.RESUMES, resumeId);

            const docSnap = await getDoc(resumeRef);

                await updateDoc(resumeRef, {
                    [section]: values,
                }, { merge: true })
        }catch(error){
            console.error("Error adding question:", error);
        }
};

// export const deleteImg = async ( uid, resumeId, profileSection ) => {
//     try{ 
//         const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
//         const resumeRef = doc(userRef, FIRESTORE_PATH_NAMES.RESUMES, resumeId);

//         await updateDoc(resumeRef, {
//                 'profileSection': {
//                     imgUrl: '',
//                     ...profileSection
//                 },
//             }, { merge: true })
//     }catch(error){
//         console.error("Error adding question:", error);
//     }
// }