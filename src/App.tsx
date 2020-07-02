import React from 'react';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import './assets/fonts/fonts.css';
import { Layout } from './components/UI/Layout/Layout';
import { Tag } from './containers/Tag/Tag';
import { TagPage } from './components/pages/TagPage/TagPage';
import MessageTemplatePage from './components/pages/MessageTemplatePage/MessageTemplatePage';
import { MessageTemplate } from './containers/MessageTemplate/MessageTemplate';
import Chat from './containers/Chat/Chat';
import styles from './App.module.css';

const App = () => {
  const defaultRedirect = () => <Redirect to="/chat" />;

  return (
    <div className={styles.App}>
      <Layout>
        <Switch>
          <Route path="/tag" exact component={TagPage} />
          <Route path="/tag/add" exact component={Tag} />
          <Route path="/tag/:id/edit" exact component={Tag} />
          {/* Doesn't this error without a passed in `contactId`? */}

          <Route path="/template" exact component={MessageTemplatePage} />
          <Route path="/template/add" exact component={MessageTemplate} />
          <Route path="/template/:id/edit" exact component={MessageTemplate} />
          <Route path="/chat" exact component={Chat} />
          {/* This part isn't working properly */}
          <Route
            exact
            path="/chat/:conversationIndex"
            component={({ match }: RouteComponentProps<{ conversationIndex: any }>) => (
              <Chat conversationIndex={match.params.conversationIndex} />
            )}
          />
        </Switch>
        <Route exact path="/" render={defaultRedirect} />
      </Layout>
    </div>
  );
};

export default App;
