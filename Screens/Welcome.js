import  React , {useState} from 'react';
import { View, Text, Button ,StyleSheet,TextInput,Alert,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddExpense from './AddExpense'
import GetTrip from './GetTrip'
import CloseTrip from './CloseTrip'
import Summary from './Summary'
const Stack = createStackNavigator();


/*** 
 * Again here since I couldnt manage to use 
 * reactnavigation service i navigate manually 
 * basicly on this screen I have button that navigate 
 * home screen name LOG OUT and i have other 4 screen 
 * to navigate that screens from that screens i have back button to
 * navigate back to welcome screen 
*/

const Welcome =(props)=>{

const [addExpScreen,setAddExpScreen]=useState(false);
const [closeTripScreen,setCloseTripScreen]=useState(false);
const [summaryScreen,setSummaryScreen]=useState(false);
const [getTrip,setGetTrip]=useState(false);
const key = props.keyVal;  
const name=props.nameVal;

const ExpenseNav =()=>{
  setAddExpScreen(true);
}

const ExpenseNavFalse =()=>{
  setAddExpScreen(false);
}

const getTripNav =()=>{
  setGetTrip(true);
}

const getTripNavFalse =()=>{
  setGetTrip(false);
}
const clsTrpNav =()=>{
  setCloseTripScreen(true);
}

const clsTrpNavFalse =()=>{
  setCloseTripScreen(false);
}
const SumNav =()=>{
  setSummaryScreen(true);
}

const SumNavFalse =()=>{
  setSummaryScreen(false);
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
let DisplayScreen;

/**on the screen  at the first i have 5 buttons 
 * that navigates to that screens when its click
 */
DisplayScreen=(
  <View>
   <Text style={styles.textStyle}> WELCOME    {name}</Text>   
   <AppButton title="ADD EXPENSE" onPress={ExpenseNav}/>
   <AppButton title="GET TRIP" onPress={getTripNav}/> 
   <AppButton title="CLOSE TRIP" onPress={clsTrpNav}/>                     
   <AppButton title="SUMMARY" onPress={SumNav}/>           
   <AppButton2 title="LOG OUT" onPress={props.homeScreen} />
  </View>
)


/**when we click add expense button it set to
 * addExpense value true and navigate to that screen
 * and passing necessary values and methods via props
 */
if(addExpScreen){
  DisplayScreen=(
    <View>
     <AddExpense 
     keyVal={key}
     back={ExpenseNavFalse} /> 
    
    </View>
  )
}

/**when we click get trip button it set to
 * getTrip value true and navigate to that screen
 * and passing necessary values and methods via props
 */
if(getTrip){
  DisplayScreen=(
    <View>
      <GetTrip back={getTripNavFalse}/>
    </View>
  )
}

/**when we click close trip button it set to
 * closetripscreen value true and navigate to that screen
 * and passing necessary values and methods via props
 */
if(closeTripScreen){
  DisplayScreen=(
    <View>
      <CloseTrip 
      keyVal={key}
      back={clsTrpNavFalse}/>
    </View>
  )
}
/**when we click summary button it set to
 * summaryScreen value true and navigate to that screen
 * and passing necessary values and methods via props
 */
if(summaryScreen){
  DisplayScreen=(
    <View>
      <Summary 
      back={SumNavFalse}/>
    </View>
  )
}

return(
    <View>
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
   loginBtn: {
   width:250,
   borderRadius:25,
   height:50,
   alignItems:"center",
   justifyContent:"center",
   marginTop:40,
   backgroundColor:"#DF9BC5",
 },
   loginBtn2: {
   width:250,
   borderRadius:25,
   height:50,
   alignItems:"center",
   justifyContent:"center",
   marginTop:40,
   backgroundColor:"#F11515",
 },
 textStyle:{
  //  textTransformations:"uppercase"
  fontSize:20,
  textAlign:"center"
 }
});

export default Welcome;