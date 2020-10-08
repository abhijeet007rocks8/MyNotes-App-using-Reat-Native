import React, {useState} from 'react';
import {StyleSheet, TextInput, Button, View} from 'react-native'
import firebase from 'firebase'
//import Toast from 'react-native-simple-toast';

const CreateNoteComponent = (props) => {
  var loggedInUserId
  var pathForData
    console.log(props)
    const [newNoteText, setNewNoteText] = useState('')

    return <View>
        <TextInput 
        style={styles.textInputStyles}
        autoCorrect={false}
        autoCapitalize="none"
        multiline={true}
        value={newNoteText}
        onChangeText={(currentText) => {
                setNewNoteText(currentText)
        
        }
        }
        />
        <Button 
            title={"Create Note"}
            onPress={() => {
               //for realtime usage the listshould update not only on clicking the button so comment out
               // props.onCreateButtonPress(newNoteText)
                //Upload the text to the firebase before resetting

              // /user/{id} where data stored in firebase
            /*if(newNoteText.length === 0)
            {
             Toast.show("Text is Empty",Toast.SHORT);
            }*/
            
            if(newNoteText.length>0){
              loggedInUserId = firebase.auth().currentUser.uid
              pathForData = `/user/${loggedInUserId}/`
              firebase.database()
              .ref(pathForData)
              .push({ 
                     'date': new Date().toDateString(),
                     'text':newNoteText
              })
              //push as it pushes an object in the list of objects(here notes)
                setNewNoteText('')
            }}}

        />
    </View>
    
}

const styles = StyleSheet.create({
    textInputStyles: {
        borderWidth: 5,
        width: 320,
        height: 140,
        borderRadius: 10,
        padding: 15,
        fontSize: 20
    }
});

export default CreateNoteComponent;