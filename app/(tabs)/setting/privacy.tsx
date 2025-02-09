import { Text } from '@/components/custom'
import React from 'react'
import { View } from 'react-native'

export default function PrivacySettings() {
    return (
        <View>
            <Text>Privacy</Text>

            <View>
                <Text>
                    Our eLearning platform is committed to providing a high-quality
                    educational experience. By using our services, you agree to comply with
                    our terms and conditions, which include respecting intellectual property rights,
                    maintaining the confidentiality of your account information, and adhering to our
                    code of conduct. We reserve the right to modify these terms at any time, and it is
                    your responsibility to stay informed of any changes. Unauthorized use of our content
                    is strictly prohibited, and we may suspend or terminate access for violations.
                    Your continued use of our platform signifies your acceptance of these terms.
                </Text>
            </View>
        </View>
    )
}
