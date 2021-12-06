import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, ImageBackground, Text, StyleSheet, Image} from 'react-native';
import globalStyles from 'src/styles';
import SplashScreen from 'react-native-splash-screen';
import {colors, fonts, fontSize} from 'src/theme.js';
import LoadingView from 'src/components/LoadingView.js';
import NavigationService from 'src/shared/NavigationService';
import HelperClass from 'src/shared/HelperClass';
import {getImpactInfo} from 'src/actions/AuthActions.js';

class Welcome extends Component {
  static navigationOptions = {headerShown: false};
  constructor(props) {
    super(props);
    this._impactData = {
      trees: '< 12k',
      beneficiaries: '< 10k',
      states: 'more then 22',
    };
    this.state = {
      showStateImpact: false,
      showTreeImpact: false,
      showBeneficiaryImpact: false,
    };
    this._interval = null;
  }

  UNSAFE_componentWillMount() {
    this.props.dispatchGetImpactInfo();
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  impactInfoFetched() {
    this.props.auth.fetchedImpactInfo = false;
    this._impactData = this.props.auth.impactData;
    this.state.showTreeImpact = true;
    HelperClass.setTreeSpecies();
    this.startShowingImpact();
  }

  componentDidUpdate() {
    if (this.props.auth.fetchedImpactInfo) {
      this.impactInfoFetched();
    }
  }

  moveToApplication() {
    clearInterval(this._interval);
    clearInterval(this._setTimeout);
    return NavigationService.resetTo('postWelcome');
  }

  startShowingImpact() {
    this._setTimeout = setTimeout(() => this.moveToApplication(), 4000);
    this._interval = setInterval(() => this.setStateForMessage(), 1000);
  }

  setStateForMessage() {
    if (this.state.showStateImpact) {
      this.setState({
        showStateImpact: false,
        showBeneficiaryImpact: true,
        showTreeImpact: false,
      });

      return true;
    }

    if (this.state.showBeneficiaryImpact) {
      this.setState({
        showStateImpact: false,
        showBeneficiaryImpact: false,
        showTreeImpact: true,
      });

      return true;
    }

    if (this.state.showTreeImpact) {
      this.setState({
        showStateImpact: true,
        showBeneficiaryImpact: false,
        showTreeImpact: false,
      });

      return true;
    }

    this.setState({
      showStateImpact: true,
      showBeneficiaryImpact: false,
      showTreeImpact: false,
    });
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  showImpact() {
    if (this.state.showTreeImpact) {
      return this.renderImpactedTree();
    }

    if (this.state.showBeneficiaryImpact) {
      return this.renderImpactedBeneficiary();
    }

    if (this.state.showStateImpact) {
      return this.renderImpactedState();
    }
  }

  renderImpactedTree() {
    return (
      <View style={styles.impactInfoView}>
        <Text style={styles.impactInfoText}>{this._impactData.trees}</Text>
        <Text style={[styles.impactInfoText, {marginTop: 5}]}>
          Healthy trees planted...
        </Text>
      </View>
    );
  }

  renderImpactedBeneficiary() {
    return (
      <View style={styles.impactInfoView}>
        <Text style={styles.impactInfoText}>
          {this._impactData.beneficiaries}
        </Text>
        <Text style={[styles.impactInfoText, {marginTop: 5}]}>
          Beneficiaries impacted...
        </Text>
      </View>
    );
  }

  renderImpactedState() {
    return (
      <View style={styles.impactInfoView}>
        <Text style={[styles.impactInfoText, {marginTop: 5}]}>
          {this._impactData.states} States...
        </Text>
      </View>
    );
  }

  renderSkipButton() {
    return (
      <View style={{width: '100%'}}>
        <Text
          onPress={() => this.moveToApplication()}
          style={styles.skipButtonText}>
          Skip
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ImageBackground
        source={require('src/assets/welcome.png')}
        style={globalStyles.flex1}>
        {this.renderSkipButton()}
        {this.showImpact()}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  impactInfoView: {
    flex: 1,
    position: 'absolute',
    bottom: 220,
    alignItems: 'center',
    width: '100%',
  },

  impactInfoText: {
    fontFamily: fonts.textPrimary,
    fontSize: fontSize.primaryText,
    color: colors.primaryDark,
  },

  skipButtonText: {
    color: colors.primary,
    alignSelf: 'flex-end',
    marginTop: 40,
    marginRight: 20,
    fontSize: fontSize.subHeader,
  },
});

const mapDispatchToProps = {
  dispatchGetImpactInfo: () => getImpactInfo(),
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
