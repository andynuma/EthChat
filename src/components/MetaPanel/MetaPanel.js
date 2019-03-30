import React from "react";
import web3 from "../../web3Provider"

class MetaPanel extends React.Component{
  state = {
    account: this.props.currentAccount,
    balance:0,
    netWork:""
  }

  // TODO:semantic UI で残高表示っぽいやつを作る、accountを渡す関数でいいな
  // truffeのデプロイ系のコマンドを使えるようにしないといけない
  // と思ったけど、しなくていい。送金だけならしなくていい
  //TODO:メッセージにメッセージ送信者のアドレスを持たせて、他のアドレスからの送金を受け付けるようにしないと
  // でもその情報はmetamaskで自動的に取得される、てか他のアカウントをどうやって保存するんや
  // データとして残して、そのデータを関数の引数にして渡すしかない、
  // そのデータが改ざんされたら終わりなんやけども

  componentDidMount =  async() =>  {
    const accounts = await this.state.account
    const myAccount =  await accounts[0]
    // console.log(myAccount)
    const balanceWei = await web3.eth.getBalance(myAccount)
    const balanceEth = await web3.utils.fromWei(balanceWei,"ether")
    this.setState({balance : balanceEth})
    // console.log(balance)
    const netWork = await web3.eth.net.getNetworkType()
    this.setState({netWork:netWork})
  }

  render(){
    return(
      <div>
        <div class="ui vertical menu">
          <a class="item">
            <h4 class="ui header">Your Address</h4>
              <p className="address">
                {this.state.account}
            </p>
          </a>
          <a class="item">
            <h4 class="ui header">Balance</h4>
            <p>
              {this.state.balance} ETH
            </p>
          </a>
          <a class="item">
            <h4 class="ui header">Network</h4>
            <p>
              {this.state.netWork}
            </p>
          </a>
        </div>
        </div>
    )
  }
}

export default MetaPanel;