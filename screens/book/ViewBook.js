import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import { WebView } from 'react-native-webview';

const ViewBook = ({ cloudinaryUrl }) => {
  // Lấy đuôi file (chuyển về chữ thường để dễ so sánh)
  const isPdf = cloudinaryUrl.toLowerCase().endsWith('.pdf');
  const isWord = cloudinaryUrl.toLowerCase().match(/\.(doc|docx)$/);

  if (isPdf) {
    // XỬ LÝ PDF: Dùng react-native-pdf
    return (
      <View style={styles.container}>
        <Pdf
          source={{ uri: cloudinaryUrl, cache: true }}
          trustAllCerts={false} // Khuyên dùng cho link https của Cloudinary
          renderActivityIndicator={() => <ActivityIndicator size="large" color="blue" />}
          onError={(error) => console.log('Lỗi hiển thị PDF:', error)}
          style={styles.pdfViewer}
        />
      </View>
    );
  }

  if (isWord) {
    // XỬ LÝ WORD: Dùng WebView thông qua Google Docs Viewer
    const googleDocsViewer = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(cloudinaryUrl)}`;
    
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: googleDocsViewer }}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="blue" />
            </View>
          )}
          style={styles.webView}
        />
      </View>
    );
  }

  // Nếu không phải PDF hoặc Word
  return (
    <View style={styles.center}>
      <Text>Định dạng file không được hỗ trợ hiển thị trực tiếp.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pdfViewer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  webView: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ViewBook;