import  React , {useState} from 'react';
import { View, Text, Button ,StyleSheet,TextInput,Alert,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AddExpense =(props)=>{
const [tripId,setTripId]=useState("");
const [description,setDescription]=useState("");
const [price,setPrice]=useState("");

const key = props.keyVal;  


function postExpense(){

/* this is fetching the http with JWT token so
in this way we can authorize the user who post this expense*/   
    fetch(`http://localhost:8080/${tripId}/expense`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' +key,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: description,
        price: price,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      // this._onValueChange(STORAGE_KEY, responseData.id_token),

      /* If there is any error message then alert this message to user*/ 
      if(responseData.message){
          alert(
        responseData.message,
        "Ok!"
      )
      /* else add the expense */
      }else{
        alert("Expense added successfuly", "Ok")
      }
     
      console.log(responseData)
    }) 
  } 

  /*this is for button styling*/ 
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

/*At the first oon the addExpense screen 
 I have  text inputs and 2 button one of this submit this trip with given detail 
 and other take it back to welcome screen, we can add expense to list clicking submit button 
 or when we click back it's navigate us to welcome screen */ 
return(
   <View style={styles.container}>

  <View style={styles.inputView}> 
  <TextInput 
   style={styles.TextInput}    
   placeholder={"tripID"}
   onChangeText={setTripId}/>
     </View>
     <View style={styles.inputView}>
 
 <TextInput 
  style={styles.TextInput}
   placeholder={"description"}
   onChangeText={setDescription}/>
     </View>
     
     <View style={styles.inputView}>
 <TextInput 
   style={styles.TextInput}
   placeholder={"Price"}
   onChangeText={setPrice}
   />
     </View>

  <View style={styles.buttonContainer}>  
  <AppButton  title="SUBMIT" onPress={postExpense}/> 
  <AppButton2 title="BACK" onPress={props.back}/>  
  </View>
 </View>
)   
}  
const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  container:{
    marginTop:100
  },
  inputView: {
   backgroundColor: "#FFC0CB",
   borderRadius: 30,
   width: 250,
   height: 75,
   marginBottom: 25,
   alignItems: "center",
   marginTop:30
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
 }
});

export default AddExpense;