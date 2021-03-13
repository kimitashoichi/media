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

// データ全件取得
export const GetAllArticles = async () => {
  try {
    const articles: any = [];
    await firestore
    .collection('test')
    .get()
    .then(snapShot => {
      if (snapShot.empty) {
        return;
      }
      snapShot.forEach(doc => {
        articles.push({
          another: doc.data().another ? doc.data().another : "no name",
          article: doc.data().article ? doc.data().article: "empty"
        });
      });
    }).catch(error => {
      throw new Error(error.message)
    });
    console.log("GetAllArticles", articles);
    return { articles }
  } catch (error) {
    return { error }
  }
};