import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  render() {
    return (
      <div className="bg" styleName="error">
        错误页面
      </div>
    );
  }
}

Index.propTypes = {};

export default connect()(Index);
