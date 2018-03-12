import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";

// 引入组件
import weixin from "@/utils/weixin";
import logger from "@/utils/logger";
import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    logger.log("props", props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
    weixin().then(res => {
      logger.log("res", res);
    }).catch(err => {
      logger.warn("err", err);
    });
  }

  render() {
    return (
      <div styleName="slogan">
        pc index
      </div>
    );
  }
}

Index.propTypes = {};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Index);
