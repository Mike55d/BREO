import React,{useEffect} from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
	StatusBar,
	RefreshControl,
	Linking
} from 'react-native';
import styles from './styles';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import {connect} from 'react-redux';
import {getRubros} from '../actions/rubros';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {routeImages} from '../actions/routePanel';
import {getAddress} from '../actions/direccion';
import { FontAwesome5 } from '@expo/vector-icons';

const Card = ({item , onPress}) => (
	<View style={styles.card}>
		<TouchableWithoutFeedback
			key={item.id}
			onPress={()=> onPress(item.id)}
			style={{ width: '25%' }}
		>
			<View style={styles.containerImage}>
				<Image style={styles.imageRubro} source={{ uri: routeImages + item.Imagen }} />
			</View>
			<Text numberOfLines={1} style={styles.textRubro} >{item.Nombre}</Text>
		</TouchableWithoutFeedback>
	</View>
)



const Home = ({navigation,dispatch,rubros , refresh, direccion, user }) =>{

	const onRefresh = React.useCallback(() => {
		dispatch(getRubros(true));
	},[rubros]);

	const onSearch = (palabras) =>{
		navigation.navigate('Comercios',{palabras:palabras,rubro:null});
	}

	const onPress = (id) =>{
		navigation.navigate('Comercios',{palabras:null,rubro:id});
	}

	const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => (
		layoutMeasurement.height + contentOffset.y >= contentSize.height -0.1
	)
	
	const sendWhatsApp = () =>{
    Linking.openURL(`whatsapp://send?text=hola...&phone=+5493425789748`)
  }

	useEffect(()=>{
		if(!rubros){
			dispatch(getRubros());
		}
	},[rubros])

	useEffect(()=>{
		if(!direccion){
			dispatch(getAddress(user.email));
		}
	},[direccion])
	
	
	return (
		<>
		<Loader/>
    <StatusBar barStyle="dark-content" backgroundColor="#eeeeee"/>
		<Header 
		onSearch={onSearch}
		placeholder="Buscar comercio"
		showSearch={true}
		textHeader="Resultados"
		navigation={navigation}
		back={false}
		/>
		{/* TOP BAR  */}
		{direccion?(
			<View style={styles.topBar}>
				<Text numberOfLines={1} style={{color:'white'}}>Domicilio: <Text style={{fontWeight:'bold',color:'white',}}>{direccion.provincia} {direccion.ciudad} {direccion.domicilio} {direccion.calle} {direccion.numero}</Text></Text>
			</View>
		):(null)}
		<ScrollView
			onScroll={({ nativeEvent }) => {
				if (isCloseToBottom(nativeEvent)) {
					console.log('bottom');
				}
			}}
			refreshControl={
				<RefreshControl refreshing={refresh} onRefresh={onRefresh} />
			}
		>
		
		<View style={styles.listContent}>
			{rubros ? (
				rubros.map(item =>
					<Card key={item.id} item={item} onPress={onPress}/>
				)
			):(null)}
		</View>
		{rubros ? (
			<View style={styles.footer}>
			<Text style={styles.textFooter}>Mandanos un WhatsApp ahora!</Text>
				<TouchableWithoutFeedback onPress={() => sendWhatsApp()}>
				<Image
              style={styles.waIcon}
              source={require('../../assets/waIcon.png')}
            />
				</TouchableWithoutFeedback>
		</View>
		):(null)}
		
		</ScrollView>
		
		</>
	)
}

const mapStateToProps = (state) =>({
	rubros:state.rubros,
	refresh:state.refresh,
	user:state.auth,
	direccion:state.direccion,
})

export default connect(mapStateToProps)(Home);