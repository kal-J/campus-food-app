import React, {useState, useEffect, useRef} from 'react';
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
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import NavHeader from '../components/NavHeader';
import {login, logout} from '../auth/Auth';
import {
  Container,
  CardItem,
  Content,
  Right,
  Icon,
  Button,
  Text,
  Form,
  Item,
  Label,
  Input,
  Tab,
  ScrollableTab,
  Tabs,
  TabHeading,
  Picker,
  ListItem,
  CheckBox,
  Body,
} from 'native-base';
import colors from '../layouts/colors';
import ScrollTabs from '../components/ScrollTabs';

const campuses = ['Lira University', 'UTC Lira'];
const fullWidth = Dimensions.get('window').width; //full width
const fullHeight = Dimensions.get('window').height; //full width

const Signup = props => {
  const [loggedin, setloggedin] = useState(props.redux_state.user.isLoggedin);
  const [isloading, setIsloading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [name, setName] = useState('');
  const [campus, setCampus] = useState([]);
  const [restaurant, setRestaurant] = useState('');
  // handle checbox
  const [check, setCheck] = useState({});

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setUploadPhoto(true);
  }, [restaurant]);

  if (isloading) {
    return (
      <View style={styles.isloading}>
        <Text style={{color: '#fff'}}>Loading...</Text>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

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
      body: createFormData(photo, {userId: '123'}),
    })
      .then(response => response.json())
      .then(response => {
        console.log('upload succes', response);
        alert('Upload success!');
      })
      .catch(error => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };

  return (
    <Container>
      <View style={{height: 0.5 * fullHeight, backgroundColor: colors.primary}}>
        <View
          style={{
            flexDirection: 'row',
            margin: 20,
          }}>
          <Icon name="arrow-back" style={{color: '#fff'}} />
          <Text style={{color: '#fff', marginLeft: 70}}>Register Yourself</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: '#fff', fontSize: 14, opacity: 0.7}}>
            Increase Your sales. Buy your favourite food
          </Text>
        </View>

        {uploadPhoto && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 20,
              
            }}>
            {photo ? (
              <Image
                source={{uri: photo.uri}}
                style={{height: "100%", width: "100%", borderRadius: 20}}
              />
            ) : (
              <View
                style={{
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="md-photos"
                  style={{fontSize: 50, color: colors.primary}}
                />
                <Button transparent onPress={handleChoosePhoto}>
                  <Text>add cover photo</Text>
                </Button>
              </View>
            )}
          </View>
        )}
      </View>

      <View style={styles.form}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 24, marginVertical: 20}}>
            Registration
          </Text>
        </View>
        <View>
          <Tabs>
            <Tab
              heading="user"
              tabStyle={{backgroundColor: colors.primary}}
              activeTabStyle={{backgroundColor: colors.primary}}>
              <Button
                full
                transparent
                style={{
                  alignItems: 'center',
                  margin: 20,
                }}
                onPress={() => {
                  props.navigation.navigate('Restaurant');
                }}>
                <Text style={{color: colors.primary, fontWeight: 'bold'}}>
                  Register
                </Text>
              </Button>
            </Tab>
            <Tab
              heading="vendor"
              tabStyle={{backgroundColor: colors.primary}}
              activeTabStyle={{backgroundColor: colors.primary}}>
              <View style={{height: 0.4 * fullHeight}}>
                <ScrollView>
                  <Item style={styles.form_item} floatingLabel>
                    <Label>Full name</Label>
                    <Input value={name} onChangeText={name => setName(name)} />
                  </Item>
                  <Item style={styles.form_item} floatingLabel>
                    <Label>Restaurant name</Label>
                    <Input
                      value={restaurant}
                      onChangeText={restaurant => setRestaurant(restaurant)}
                    />
                  </Item>

                  <Item
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      ...styles.form_item,
                    }}>
                    <Label style={styles.form_label}>
                      select the campuses you deliver to
                    </Label>

                    {campuses.map((value, index) => {
                      return (
                        <View
                          key={index}
                          style={{flexDirection: 'row', marginVertical: 5}}>
                          <CheckBox
                            color={colors.primary}
                            checked={check[`${index}`]}
                            onPress={() => {
                              if (check[`${index}`]) {
                                setCheck({...check, [index]: false});
                                setCampus(campus.splice(index, 1));
                              } else {
                                setCheck({...check, [index]: true});
                                campus.push(value);
                                setCampus([...campus]);
                              }
                            }}
                          />
                          <Body
                            style={{
                              alignItems: 'flex-start',
                              marginLeft: 15,
                            }}>
                            <Text>{value}</Text>
                          </Body>
                        </View>
                      );
                    })}
                  </Item>
                  <Button
                    full
                    style={{
                      alignItems: 'center',
                      backgroundColor: colors.primary,
                      marginHorizontal: 20,
                    }}
                    onPress={() => {
                      props.navigation.navigate('Restaurant');
                    }}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                      Register
                    </Text>
                  </Button>
                </ScrollView>
              </View>
            </Tab>
          </Tabs>
        </View>
      </View>
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
  form: {
    position: 'absolute',
    zIndex: 2,
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#fff',
    top: 0.4 * fullHeight,
    left: 0,
    right: 0,
  },
  form_item: {
    marginBottom: 5,
  },
  form_label: {
    marginVertical: 5,
  },
});

export default connect(
  mapStateToProps,
  {setUser},
)(Signup);
