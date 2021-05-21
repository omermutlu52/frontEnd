import  React , {useState} from 'react';
import { View, Text, Button ,StyleSheet,TextInput,Alert,FlatList,SafeAreaView, SectionList, StatusBar, ScrollView,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Card from '../Component/Card';

const Summary =(props)=>{
const [tripId,setTripId]=useState("");
const [response,setResponse]=useState(null);

/** i have get method thats brings data from server*/
function summary(){
   fetch(`http://localhost:8080/${tripId}/summary`, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseData) => {
      // this._onValueChange(STORAGE_KEY, responseData.id_token),
     if( responseData.message){
       alert(responseData.message,"ok")
     }else{
             setResponse(responseData);
     }
      console.log(responseData);
     
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

/** in this screen same as GetTrip screen i have button that we should pass the value 
 * which trip we want to see 
*/
let DisplayScreen=(
<View style={styles.container}>
 
 <View style={styles.inputView}> 
 <TextInput 
  style={styles.TextInput}
   placeholder={"tripID"}
   onChangeText={setTripId}/>
   </View>

     <View style={styles.buttonContainer}>  
  <AppButton  title="SUBMIT" onPress={summary}/> 
  <AppButton2 title="BACK" onPress={props.back}/>  
  </View>
</View>
)

/*when we get response succesfully then its 
display the data and we have back button to go back to welcome screen
*/
if(response){   
DisplayScreen=(
     <SafeAreaView style={styles.container1}>
    <ScrollView >
<Text style={styles.textInput2}>{tripId}</Text>

{response.paymentHistory.map((data,index)=>{
      return (<Card 
      style={styles.card}
      key={((data.price+25)*(Math.random()))*Math.random()}>
<Text> {data.description} : {data.price}</Text>
<Text>  </Text>
      </Card>) 
    })}       


 {response.userPayment.map((data,index)=>{
      return (<Card 
      style={styles.card}
      key={((data.price+25)*(Math.random()))*Math.random()}>
<Text> {data.name}</Text>
<Text> {data.description}</Text>
      </Card>) 
    })}

    <View>
      <Button title="BACK" onPress={props.back}/> 
    </View>
    </ScrollView>
  </SafeAreaView>   

)
}

return(
   <View >
  
   {DisplayScreen}
  
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
    backgroundColor: "#FFC0CB",
    padding: 20,
    borderRadius: 10,
    marginBottom:20,
    width:300
  },
   container: {
  marginTop:250

  }, 
   container1:{
    marginTop:50
  }, 
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  },inputView: {
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
 textInput2:{
 textAlign:"center",
 alignContent:"center",
 textTransform:"uppercase",
 marginBottom:10
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
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // paddingRight:10
 },
 textInput2:{
 textAlign:"center",
 alignContent:"center",
 textTransform:"uppercase",
 marginBottom:15
 }
});

export default Summary;