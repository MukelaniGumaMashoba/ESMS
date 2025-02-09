import { Text } from '@/components/custom'
import React from 'react'
import { View } from 'react-native'

export default function AboutCompany() {
    return (
        <View>
            <Text>About ESMS</Text>

            <View>
                <Text>
                    With partnership with the Ministry of Education, ESMS is a platform that provides 
                    a high-quality educational experience. By using our services, you agree to comply with
                    our terms and conditions, which include respecting intellectual property rights,
                    maintaining the confidentiality of your account information, and adhering to our
                    code of conduct. We reserve the right to modify these terms at any time, and it is
                    your responsibility to stay informed of any changes. Unauthorized use of our content
                    is strictly prohibited, and we may suspend or terminate access for violations.
                </Text>
            </View>
        </View>
    )
}
