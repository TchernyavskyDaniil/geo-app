<template>
	<div class="view-profile container">
    <div class="card" v-if="profile">
      <h2 class="deep-purple-text container center">
        {{profile.alias}}'s Wall
      </h2>
      <ul class="comments collection">
        <li v-for="(comment, index) in comments" :key="index" class="comment">
          <div class="deep-purple-text comment-name">{{comment.from}}</div>
          <div class="grey-text text-darken-2 comment-content">{{comment.content}}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment" class="field">
        <div class="field">
          <label for="comment">Add a comment here!</label>
          <input type="text" name="comment" id="comment" v-model="newComment">
          <p v-if="feedback" class="red-text center">{{feedback}}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import db from '@/firebase/init'
  import firebase from 'firebase'
  
  export default {
    name: "ViewProfile",
    data () {
      return {
        profile: null,
        newComment: null,
        feedback: null,
        user: null,
        comments: []
      }
    },
    created () {
      let ref = db.collection('users')
      
      ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snap => {
          snap.forEach(doc => {
            this.user = doc.data()
            this.user.id = doc.id
          })
      })
      
      ref.doc(this.$route.params.id).get()
        .then(user => {
          this.profile = user.data()
      })
      
      db.collection('comment').where('to', '==', this.$route.params.id)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              this.comments.unshift({
                from: change.doc.data().from,
                content: change.doc.data().content
              })
            }
          })
          console.log(this.comments)
        })
    },
    methods: {
      addComment () {
        if (this.newComment) {
          this.feedback = null
          db.collection('comment').add({
            to: this.$route.params.id,
            from: this.user.id,
            content: this.newComment,
            time: Date.now()
          }).then(() => this.newComment = null)
        } else {
          this.feedback = 'You must add comment!'
        }
      }
    }
  }
</script>

<style>
  .view-profile {
    margin-top: 60px;
  }
  
  .comment {
    padding: 4px 10px 4px 10px;
    border-bottom: 1px solid lightgray;
  }
  
  .field {
    padding: 5px;
  }
  
  .comment-name,
  .comment-content {
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
