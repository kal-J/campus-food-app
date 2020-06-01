import React, {useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-picker';
import jwt_decode from 'jwt-decode';
import {connect} from 'react-redux';
import {mapStateToProps} from '../redux/mapStateToProps';
import {setUser} from '../redux/actions';
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import NavHeader from '../components/NavHeader';
import {login, logout} from '../auth/Auth';
import {
  Container,
  Card,
  CardItem,
  Content,
  Right,
  Icon,
  Button,
  Text,
  Picker,
  Item,
  Label,
  Input,
  Textarea,
} from 'native-base';
import colors from '../layouts/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Restaurant = props => {
  const [photo, setPhoto] = useState(null);
  const [menu, setMenu] = useState(false);
  const [menuData, setMenuData] = useState(null);
  const [meal, setMeal] = useState(null);
  const [item_name, setItem_name] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const meals = ['BREAKFAST', 'LUNCH', 'SUPPER'];

  useEffect(() => {
    if (menuData !== null && photo !== null) {
      createVendor();
    }
  }, [menuData]);

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setPhoto(response);
      }
    });
  };

  const createFormData = (photo, body) => {
    const data = new FormData();

    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  // this function will handle sending all my data to the backend.
  const createVendor = () => {
    fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: createFormData(photo, {...menuData}),
    })
      .then(response => response.json())
      .then(response => {
        console.log('upload success', response);
        alert('Upload success!');
      })
      .catch(error => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };

  if (!menu) {
    return (
      <View style={{flex: 1}}>
        <NavHeader navigation={props.navigation} />
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Text style={{color: colors.light}}>
            You have not set up any menu.
          </Text>
        </View>
        <Button full transparent onPress={() => setMenu(true)}>
          <Text style={{color: colors.primary}}>Add new menu</Text>
        </Button>
      </View>
    );
  }

  return (
    <Container>
      <NavHeader navigation={props.navigation} />

      <ScrollView style={{flex: 1, margin: 20}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.primary,
            marginVertical: 10,
          }}>
          <Text style={styles.field_label}>select meal</Text>
          <Picker
            mode="dropdown"
            selectedValue={meal}
            onValueChange={value => {
              setMeal(value);
            }}>
            {meals.map((meal, index) => {
              return <Picker.Item key={index} label={meal} value={meal} />;
            })}
          </Picker>
        </View>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={styles.field_label}>Add meal Item</Text>
          <Item style={styles.form_item} floatingLabel>
            <Label>Item name</Label>
            <Input
              value={item_name}
              onChangeText={item_name => setItem_name(item_name)}
            />
          </Item>
        </View>

        <View
          style={{
            marginVertical: 10,
          }}>
          {photo ? (
            <Image
              source={{uri: photo.uri}}
              style={{width: 50, height: 50}}
            />
          ) : (
            <Button
              full
              transparent
              style={{
                borderWidth: 1,
                borderColor: colors.primary,
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleChoosePhoto}>
              <Text style={styles.field_label}>upload image of item</Text>
            </Button>
          )}
        </View>

        <View
          style={{
            marginVertical: 10,
          }}>
          <Item style={styles.form_item} floatingLabel>
            <Label>Price</Label>
            <Input
              value={price}
              onChangeText={price => setPrice(price)}
              keyboardType="numeric"
            />
          </Item>
        </View>

        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={styles.field_label}>Item Description</Text>
          <Textarea
            style={{
              borderWidth: 1,
              borderColor: colors.primary,
              borderRadius: 5,
            }}
            value={description}
            onChangeText={description => setDescription(description)}
            rowSpan={4}
            placeholder="item description..."
          />
        </View>

        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Button
            full
            style={{alignItems: 'center', backgroundColor: colors.primary}}
            onPress={() => {
              const menu = {
                meal: {
                  name: meal,
                  items: {
                    name: item_name,
                    price: parseInt(price),
                    description: description,
                    options: [],
                  },
                },
              };
              setMenuData(menu);
            }}>
            <Text>save menu</Text>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  isloading: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form_item: {
    marginBottom: 5,
  },
  field_label: {
    color: colors.primary,
  },
});

export default connect(
  mapStateToProps,
  {setUser},
)(Restaurant);
