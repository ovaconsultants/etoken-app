import { StyleSheet, View, Text, } from 'react-native';
import { Tv, Users ,Home } from 'lucide-react-native';
import FooterNavigation from '../../components/tabNavigationFooter/TabNavigationFooter';
import React from 'react';


const DefaultReceptionScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>

            {/* Main Content */}
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Tv size={48} color="#007AFF" />
                    <Users size={48} color="#007AFF" style={styles.secondIcon} />
                </View>
                <Text style={styles.title}>No Active Tokens</Text>
                <Text style={styles.subtitle}>Currently there are no patients in the queue</Text>
                <Text style={styles.instruction}>
                    When patients check in, their tokens will appear here
                </Text>
            </View>
            <FooterNavigation
              navigation={navigation}
              currentRoute="Reception"
              routes={[
                {
                  id: 'home',
                  icon: Home,
                  screen: 'Home',
                  label: 'Home',
                },
              ]}
            />
        </View>
    );
};

export default DefaultReceptionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginTop: 16,
    },
    backButtonText: {
        color: '#007AFF',
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        marginTop: -40, // Adjust to balance visual centering
    },
    iconContainer: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    secondIcon: {
        marginLeft: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
        textAlign: 'center',
    },
    instruction: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        fontStyle: 'italic',
        maxWidth: '80%',
    },
});
