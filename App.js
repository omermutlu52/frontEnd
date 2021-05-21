import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native';
import Welcome from './Screens/Welcome'

export default function App() {
const [key,setKey]=useState("");
const [name,setName]=useState("");
const [password,setPassword]=useState("");

 const load=()=> {
  fetch(`http://localhost:8080/login?username=${name}&password=${password}`)
.then(response=>{
  return response.text();
}).then(responData=>{
  if(responData.includes("error")){
   alert("Unathorized User")
  }else {
    setKey(responData)
  }
  console.log(responData)
})
}
/** This for the button styling*/
const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.loginBtn}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

/* I couldn't use React native navigation and I navigate screens manualy 
on this screen i have login page when we text username and password successfully then 
its sets the key value and navigate us to welcome screen */ 


let displayScreen;

displayScreen=(
  <View >
    <View style={styles.inputView}>
 <TextInput
         style={styles.TextInput}
         placeholder={"USERNAME"} 
         placeholderTextColor="#003f5c"
         onChangeText={setName}
      />
    </View>
<View style={styles.inputView}>  
 <TextInput
         style={styles.TextInput}
         placeholder={"PASSWORD"}
         placeholderTextColor="#003f5c"
        onChangeText={setPassword}
      />
</View>
      
     <AppButton  title="LOGIN" onPress={load}/>
  </View>
)

/*from welcome screen we call that method which set 
set key and set name to null and navigate us to login screen 
and asking again username and password to continue proccess 
**/ 
const keyNull=()=>{
  setKey("");
  setName("");
}

/*when we set the username and password succesfuly 
then its set the key value and navigate use to welcome screen*/

if(key){
  displayScreen=(
    <View>
      <Welcome 
      keyVal={key}
      homeScreen={keyNull}
      nameVal={name}/>
    </View>
  )
}

  return (
<View style={styles.container}>
{displayScreen}
</View>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFDDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
   backgroundColor: "#FFC0CB",
   borderRadius: 30,
   width: 250,
   height: 75,
   marginBottom: 25,
   alignItems: "center",
 },
 TextInput: {
   height: 50,
   flex: 1,
 },
 loginBtn: {
   width:250,
   borderRadius:25,
   height:50,
   alignItems:"center",
   justifyContent:"center",
   marginTop:40,
   backgroundColor:"#DF9BC5",
 }
});

