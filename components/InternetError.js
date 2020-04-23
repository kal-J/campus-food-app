import React from 'react';
import { View } from 'react-native';
import { Text, Icon, Button } from 'native-base';

const InternetError = () => {
    return(
        <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{marginVertical: 50}}>No connection</Text>
        <View>
          <Icon size={50} name="wifi" style={{ color: "gray", fontSize: 100 }} />
        </View>
        
        <Text style={{marginVertical: 50}}>An internet error occured, please try again</Text>
        <Button style={{backgroundColor: 'gray', marginVertical: 50}}>
          <Text>try again</Text>
        </Button>
      </View>
    );
}

export default InternetError;