import firebase from "firebase";

export default function fetchDriverLocation(email) {
  var driverLocation = null;

  firebase
    .firestore()
    .collection("jobs")
    .where("email", "==", email)
    .where("activeCd", "==", "Y")
    .onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => (driverLocation = doc.data().driverLocation));
    });

  return driverLocation;
}
