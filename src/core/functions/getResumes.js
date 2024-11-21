import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { FIRESTORE_PATH_NAMES } from '../utils/constants';
import { doc, getDoc } from 'firebase/firestore';

export const fetchResumes = async (uid) => {
    const resumesArray = []; 
    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);  
    const resumesRef = collection(userRef, FIRESTORE_PATH_NAMES.RESUMES); 
    
    try {
        const querySnapshot = await getDocs(resumesRef);
        
        querySnapshot.forEach((doc) => {
            resumesArray.push({
                id: doc.id,   
                ...doc.data()
            });
        });

        return resumesArray; 
    } catch (error) {
        console.error("Error fetching resumes:", error);
        return [];
    }
};

export const fetchResumeById = async (uid, resumeId) => {
    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
    const resumeRef = doc(collection(userRef, FIRESTORE_PATH_NAMES.RESUMES), resumeId);
console.log(resumeRef);

    try {
        const resumeSnap = await getDoc(resumeRef);
        console.log(resumeSnap.data())

        if (resumeSnap.exists()) {
            return resumeSnap.data();
        } else {
            console.error("No such resume document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching resume: ", error);
        return null;
    }
};
