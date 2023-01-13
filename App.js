import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
} from 'react-native';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

const PaymentRequest = require('react-native-payments').PaymentRequest;

const METHOD_DATA = [
  {
    supportedMethods: ['apple-pay'],
    data: {
      merchantIdentifier: 'merchant..com.applepay',
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      countryCode: 'US',
      currencyCode: 'USD',
    },
  },
];

const DETAILS = {
  id: 'basic-example',
  displayItems: [
    {
      label: 'Movie Ticket',
      amount: {currency: 'USD', value: '15.00'},
    },
    {
      label: 'Grocery',
      amount: {currency: 'USD', value: '5.00'},
    },
  ],
  shippingOptions: [
    {
      id: 'economy',
      label: 'Economy Shipping',
      amount: {currency: 'USD', value: '0.00'},
      detail: 'Arrives in 3-5 days', // `detail` is specific to React Native Payments
    },
  ],
  total: {
    label: 'Enappd Store',
    amount: {currency: 'USD', value: '20.00'},
  },
};
const OPTIONS = {
  requestPayerName: true,
  requestPayerPhone: true,
  requestPayerEmail: true,
  requestShipping: true,
};
const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS, OPTIONS);

paymentRequest.addEventListener('shippingaddresschange', e => {
  const updatedDetails = getUpdatedDetailsForShippingAddress(
    paymentRequest.shippingAddress,
  );

  e.updateWith(updatedDetails);
});

paymentRequest.addEventListener('shippingoptionchange', e => {
  const updatedDetails = getUpdatedDetailsForShippingOption(
    paymentRequest.shippingOption,
  );

  e.updateWith(updatedDetails);
});

check = () => {
  paymentRequest.canMakePayments().then(canMakePayment => {
    if (canMakePayment) {
      Alert.alert('Apple Pay', 'Apple Pay is available in this device');
    }
  });
};

pay = () => {
  paymentRequest.canMakePayments().then(canMakePayment => {
    if (canMakePayment) {
      console.log('Can Make Payment');
      paymentRequest.show().then(paymentResponse => {
        console.log('paymentResponse', paymentResponse);
        // Your payment processing code goes here

        paymentResponse.complete('success');
      });
    } else {
      console.log('Cant Make Payment');
    }
  });
};

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Check</Text>

              <Button onPress={() => this.check()} title="Check Apple Pay" />
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <View>
                <Text style={styles.sectionTitle}>Cart</Text>
                <Text style={styles.sectionDescription}></Text>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <View style={styles.itemDetail}>
                <Text style={styles.itemTitle}>Ticket</Text>
                <Text style={styles.itemDescription}>Desc 1</Text>
              </View>
              <View style={styles.itemPrice}>
                <Text>USD 20.00</Text>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <View style={styles.itemDetail}>
                <Text style={styles.itemTitle}>Cart 1</Text>
                <Text style={styles.itemDescription}>Desc 2</Text>
              </View>
              <View style={styles.itemPrice}>
                <Text>USD 20.00</Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <View style={styles.itemDetail}>
                <Text style={styles.itemTitle}>Total</Text>
              </View>
              <View style={styles.itemPrice}>
                <Text>USD 40.00</Text>
              </View>
            </View>
            <Button
              style={styles.payButton}
              title="Pay with Apple Pay"
              onPress={() => this.pay()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {backgroundColor: Colors.lighter},
  engine: {position: 'absolute', right: 0},
  body: {
    backgroundColor: Colors.white,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  sectionContainer: {marginTop: 32, paddingHorizontal: 24},
  itemContainer: {
    marginTop: 12,
    paddingHorizontal: 24,
    display: 'flex',
    flexDirection: 'row',
  },
  totalContainer: {
    marginTop: 12,
    paddingHorizontal: 24,
    display: 'flex',
    flexDirection: 'row',
    borderTopColor: '#cccccc',
    borderTopWidth: 1,
    paddingTop: 10,
    marginBottom: 20,
  },
  itemDetail: {flex: 2},
  itemTitle: {fontWeight: '500', fontSize: 18},
  itemDescription: {fontSize: 12},
  itemPrice: {flex: 1},
  sectionTitle: {fontSize: 24, fontWeight: '600', color: Colors.black},
  sectionDescription: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {fontWeight: '700'},
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
