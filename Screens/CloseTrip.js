import  React , {useState} from 'react';
import { View, Text, Button ,StyleSheet,TextInput,Alert,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const CloseTrip =(props)=>{
const [tripId,setTripId]=useState("");
const key = props.keyVal;  

/** I have close post fecth here  */
function Closetrip(){
    
    fetch(`http://localhost:8080/${tripId}/close`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' +key,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
 .then((response) => response.json())
    .then((responseData) => {
              console.log(responseData)

 /* if there is error message then alert this messsage */             
      if(responseData.message){
          alert(responseData.message,"Ok")
          /**else alert user that tripId added succesfuly to list  */
      }else{
           alert(`${tripId} successfully added to the closed trip list.`,"ok")
      }
     
    }) 
  } 
  const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.loginBtn}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);
const AppButton2 = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.loginBtn2}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

 
/*its add the trip name to closed trip list so then we cannot add 
expense to that trip anymore*/ 
return(

   <View style={styles.container}>
   <View style={styles.inputView}> 
   <TextInput
   style={styles.TextInput}
   placeholder={"tripID"}
   onChangeText={setTripId}/>
   </View>
      <View style={styles.buttonContainer}>  
  <AppButton  title="SUBMIT" onPress={Closetrip}/> 
  <AppButton2 title="BACK" onPress={props.back}/>  
  </View>
  
 </View>

)   
}  

const styles = StyleSheet.create({
 
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
   buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // paddingRight:10
 },
 
    loginBtn: {
   width:100,
   borderRadius:25,
   height:50,
   alignItems:"center",
   justifyContent:"center",
   marginTop:20,
   backgroundColor:"#DF9BC5",
 },
   loginBtn2: {
   width:100,
   borderRadius:25,
   height:50,
   alignItems:"center",
   justifyContent:"center",
   marginTop:20,
   backgroundColor:"#F11515",
 },
 container:{
  marginTop:250
}
});

export default CloseTrip;