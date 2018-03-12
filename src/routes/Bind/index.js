import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import queryString from "query-string";
import { List, InputItem, Toast, Button, Flex, ImagePicker, WhiteSpace } from "antd-mobile";
import { createForm } from 'rc-form';

// 引入组件
import logger from "@/utils/logger";
import { smsCode } from "@/services/auth";
import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    logger.log("props", props);
    const parsed = queryString.parse(props.location.search);
    this.wxToken = parsed.wxToken;
    logger.log("bind wxToken", this.wxToken, this.wxToken);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  onGetSmsCode = () => {
    const phone = this.props.form.getFieldValue("telephone");
    smsCode(phone, "login").then(res => {
      logger.log("smsCode res", res);
    }).catch(err => {
      Toast.info(err.message);
      logger.log("smsCode err", err);
    });
  };

  onSubmit = () => {
    this.props.form.validateFields(async (error, value) => {
      logger.log("validate", error, value);
      if (!error) {
        // 报名提交
        this.props.dispatch({
          type: "auth/bind",
          payload: {
            wxToken: this.wxToken,
            ...value,
          }
        }).then(res => {
          logger.log("signUp res", res);
        }).catch(err => {
          logger.warn("signUp err", err);
          Toast.info(err.message);
        });
      }
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { files } = this.state;
    return (
      <div>
        <List renderHeader={() => "绑定"}>
          <Flex>
            <Flex.Item>
              <InputItem
                {
                  ...getFieldProps('telephone', {
                    validateTrigger: "onBlur",
                    rules: [{ required: true, message: "请填入手机号" }]
                  })
                }
                onErrorClick={() => {
                  const err = getFieldError("telephone");
                  if (err) {
                    Toast.info(err);
                  }
                }}
                error={getFieldError("telephone")}
                placeholder="手机号"
              >
                手机号
              </InputItem>
            </Flex.Item>

            <Button type="primary" size="small" inline onClick={this.onGetSmsCode}>获取验证码</Button>

          </Flex>

          <InputItem
            {
              ...getFieldProps('smsCode', {
                validateTrigger: "onBlur",
                rules: [{ required: true, message: "请填入验证码" }]
              })
            }
            onErrorClick={() => {
              const err = getFieldError("smsCode");
              if (err) {
                Toast.info(err);
              }
            }}
            error={getFieldError("smsCode")}
            placeholder="验证码"
          >
            验证码
          </InputItem>
          <WhiteSpace/>

          <Button type="primary" onClick={this.onSubmit}>报名</Button>

        </List>
      </div>
    );
  }
}

Index.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(createForm()(Index));
