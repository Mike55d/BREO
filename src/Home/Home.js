import React,{useEffect} from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
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



const Home = ({navigation,dispatch,rubros , refresh, direccion, user}) =>{

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
    Linking.openURL(`whatsapp://send?text=hola...&phone=+5493425327838`)
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
		<Header 
		onSearch={onSearch}
		placeholder="Buscar comercio"
		showSearch={true}
		textHeader="Resultados"
		navigation={navigation}
		back={false}
		/>
		<Loader/>
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
		{/* TOP BAR  */}
		{direccion?(
			<View style={styles.topBar}>
				<Text>Domicilio: <Text style={{fontWeight:'bold'}}>{direccion.provincia} {direccion.ciudad} {direccion.domicilio}</Text></Text>
			</View>
		):(null)}
		<View style={styles.listContent}>
			{rubros ? (
				rubros.map(item =>
					<Card key={item.id} item={item} onPress={onPress}/>
				)
			):(null)}
		</View>
		
		</ScrollView>
		<View style={styles.footer}>
			<Text style={styles.textFooter}>Mandanos un WhatsApp ahora!</Text>
				<TouchableWithoutFeedback onPress={() => sendWhatsApp()}>
					<View style={{ backgroundColor: 'green', padding: 10, paddingTop: 6, borderRadius: 30 }}>
						<FontAwesome5 name="whatsapp" size={25} color="white" />
					</View>
				</TouchableWithoutFeedback>
		</View>
		</>
	)
}

const mapStateToProps = (state) =>({
	rubros:state.rubros,
	refresh:state.refresh,
	user:state.auth,
	direccion:state.direccion
})

export default connect(mapStateToProps)(Home);