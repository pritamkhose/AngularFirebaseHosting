document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    console.log(app);

    const db = firebase.firestore();
    // Reference the document
    const myPost0 = db.collection('products').doc('XgJf8tSULYIKPBxS1Azw');
    // Listen to realtime changes 
    myPost0.onSnapshot(doc => {
        const data = doc.data();
        console.log(data); 
        document.write(`<button onclick="googleLogin()"> Login Google</button><hr/>`);
        document.write(`<input type="file" onchange="uploadFile(this.files)"></input><hr/>`);
        document.write(data.title + ` = $` + data.price + ` @ ` + data.createdAt);
        document.write(`<hr/>`);
    });

    const productsRef = db.collection('products');
    query = productsRef; // productsRef.where('price', '<', 20);
    query.get().then(products => {
        products.forEach(doc => {
            data = doc.data();
            document.write(data.title + ` = $` + data.price + ` @ ` + data.createdAt+ `<br/>`);
        });
    });


});

function uploadFile(files) {
    const storageRef = firebase.storage().ref();
    const imgRef = storageRef.child('pritam.jpg');

    const file = files.item(0);

    const task = imgRef.put(file)

    // successful upload
    task.then(snapshot => {
        const url = snapshot.downloadURL;
        console.log(url); 
    })

    // monitor progress
    task.on('state_changed', snapshot => {
        console.log(snapshot)

    })
}

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        
            .then(result => {
                const user = result.user;
                document.write(`Hello ${user.displayName}`);
                console.log(user); 
                console.log(result);  
            })  
}
