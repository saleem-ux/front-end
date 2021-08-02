import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Card,Button } from 'react-bootstrap';
// import MyApiCard from './MyApiCard';


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://localhost:8080',
      dataList: [],
      showData: false,
    }

  }

  componentDidMount = async () => {
    axios.get(`${this.state.url}/api`).then(result => {
      this.setState({
        dataList: result.data,
        showData: true,
      })
    })
  }

  creatFav = async (item) => {
    const reqbody = {
      email: this.props.auth0.user.email,
      name: item.name,
      img: item.img,
      level: item.level
    };
    axios.post(`${this.state.url}/fav`, reqbody)
  }

  render() {
    return (
      <>
      {/* <MyApiCard dataList={this.state.dataList} creatFav={this.creatFav} showData={this.state.showData}/> */}
        {this.state.showData && this.state.dataList.map((item, index) => {
          return (
            <>
              <Card style={{ width: "18rem", margin: "1.5rem", display: "inline-block", }}                >                 
               <Card.Img variant="top" src={item.img} alt="" />                  
               <Card.Body>                    
                 <Card.Title>{item.name}</Card.Title>                    
                 <Card.Text>{item.level}</Card.Text>                    
                 <Button onClick={()=>{this.creatFav(item)}}>Add To Fav</Button>                  
                 </Card.Body>                
                 </Card>
            </>
          )
        })}
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
