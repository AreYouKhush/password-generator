import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

//Form Validation
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Must be between 4 and 16')
    .max(16, 'Must be between 4 and 16')
    .required('This field is required!')
    .typeError('Number is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseList = upperCaseList.toLowerCase();
    const numbersList = '0123456789';
    const symbolsList = '!@#$%^&*_()+';

    if (upperCase) {
      characterList += upperCaseList;
    }
    if (lowerCase) {
      characterList += lowerCaseList;
    }
    if (numbers) {
      characterList += numbersList;
    }
    if (symbols) {
      characterList += symbolsList;
    }
    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
  };

  const resetPassword = () => {
    setIsPassGenerated(false);
    setPassword('');
    setNumbers(false);
    setUpperCase(false);
    setLowerCase(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <SafeAreaView>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Password Generator</Text>
        </View>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              generatePasswordString(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={[styles.inputWrapper, styles.specialWrapper]}>
                  <View>
                    <Text style={styles.label}>Password Length : </Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    placeholderTextColor="black"
                    keyboardType="numeric"></TextInput>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Include LowerCase :</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#1b263b"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Include UpperCase :</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#1b263b"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Include Numbers :</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#1b263b"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Include Symbols :</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#1b263b"
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={
                      !(
                        isValid &&
                        (numbers || upperCase || lowerCase || symbols)
                      )
                    }
                    style={[styles.formActionButton, styles.formSubmitButton]}
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Text style={styles.buttonText}>Generate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.formActionButton, styles.formResetButton]}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 22,
                marginBottom: 20,
              }}>
              🥳 Password Generated 🥳
            </Text>
            <Text selectable={true} style={{color: '#1b263b', fontSize: 20}}>
              {password}
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e1dd',
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1b263b',
  },
  headingText: {
    color: '#e0e1dd',
    fontWeight: 'bold',
    fontSize: 22,
  },
  formContainer: {
    padding: 25,
    gap: 10,
  },
  label: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
  },
  specialWrapper: {
    paddingBottom: 20,
  },
  errorText: {
    color: 'red',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formActions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  formActionButton: {
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  formSubmitButton: {
    backgroundColor: '#1b263b',
  },
  formResetButton: {
    backgroundColor: '#778da9',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputStyle: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    color: 'black',
    maxWidth: 100,
  },
});
