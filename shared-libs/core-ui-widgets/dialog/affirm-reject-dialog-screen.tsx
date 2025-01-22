import React from 'react'
import { AffirmRejectDialog } from './affirm-reject-dialog-content'
import { useNavigation } from '@react-navigation/native'
import { NavigableRoute } from '@tallo/navigation'

export const AffirmRejectDialogScreen: React.FC<NavigableRoute.AFFIRM_REJECT_MODAL> = ({ route }) => {
  const { onAffirm, onReject, affirmText, rejectText, title, body, dismissOnReject, icon, action } = route.params
  const navigation = useNavigation()

  const dismiss = () => {
    navigation.goBack()
    if (action) return action()
  }

  return (
    <AffirmRejectDialog
      onAffirm={onAffirm}
      onReject={onReject}
      dismiss={dismiss}
      affirmText={affirmText}
      rejectText={rejectText}
      icon={icon}
      title={title}
      body={body}
      dismissOnReject={dismissOnReject}
    />
  )
}
