import React from "react";
import { firestore } from '../firebase';

// firebaseに記事データを保存する記載をする
// 前に作成したものの流用でOK

// データ投稿
export const AddCardBody = async (data: any) => {
  try {
    await firestore
    .collection('test')
    .doc()
    .set(data)
    .catch((error) => {
      console.log('postIdea Error Firebase')
      throw new Error(error.message);
    })
    const success = { success: 'PostIdea 200 ok' };
    return { success }
  } catch(error) {
    console.log('postIdea Error')
    return { error }
  }
}