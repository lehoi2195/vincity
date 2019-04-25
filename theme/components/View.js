import variable from "./../variables";
import { StyleSheet } from 'react-native';

export default (variables = variable) => {
  const viewTheme = {
    '.padder': {
      padding: variables.contentPadding
    },
    '.margged': {
      margin: variables.contentPadding
    },
    '.rounded': {
      borderRadius: 4
    },
    '.flexStart': {
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    '.flexEnd': {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    '.row': {
      flexDirection: 'row',
      alignItems: 'center'
    },
    '.full': {
      justifyContent: 'space-between',
      width: '100%'
    },
    '.container': {
      height: '100%',
      width: '100%'
    },
    '.center': {
      justifyContent: 'center',
      alignItems: 'center'
    },
    '.justify': {
      justifyContent: 'center'
    },
    '.align': {
      alignItems: 'center'
    },
    '.paddingVertical': {
      padding: 10,
      flexDirection: 'row'
    },
    '.white': {
      backgroundColor: '#fff'
    },
    '.paddingContent': {
      padding: 10
    },
    '.border': {
      borderColor: variable.borderColor,
      borderRightWidth: variable.borderWidth,
      borderBottomWidth: variable.borderWidth
    },
    '.borderFull': {
      borderColor: variable.borderColor,
      borderWidth: variable.borderWidth
    },
    '.borderBottom': {
      borderBottomColor: variable.borderColor,
      borderBottomWidth: variable.borderWidth
    },
    '.borderTop': {
      borderTopColor: variable.borderColor,
      borderTopWidth: variable.borderWidth
    },
    '.borderRight': {
      borderRightColor: variable.borderColor,
      borderRightWidth: variable.borderWidth
    },
    '.borderLeft': {
      borderLeftColor: variable.borderColor,
      borderLeftWidth: variable.borderWidth
    }
  };

  return viewTheme;
};
