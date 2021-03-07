import Header from "./component/header";

const About ={
    render(){
        return `
        <head>
    <title>Về chúng tôi</title></head>
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>

<div class="aboutus-section">
        <div class="container">
            <div class="row">
                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="aboutus">
                        <h2 class="aboutus-title">About Us</h2>
                        <p class="aboutus-text">Head phone là học viện về Digital Marketing chuyên đào tạo : Digital Marketing, SEO, Facebook, Content marketing lớn nhất Việt Nam với 4 cơ sở tại Hanoi (3 điểm) và HCM (1 điểm), là Học viện đầu tiên đào tạo SEO tại Việt Nam. Là học viện lớn nhất với gần 5000 học viên, Số lượng học viên 1 tháng là gần 300 học viên tại 4 cơ sở. Tổng số khóa tốt nghiệp hiện nay tất cả là hơn 100 khóa học chất lượng. Riêng SEO là nơi có cam kết 100% lên top và bán hàng ngay trong khóa học.</p>
                        <a class="aboutus-more" href="#">read more</a>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="aboutus-banner">
                        <img src="https://camerasaigon24h.com/hinh/camera-head%20phone.png" alt="" width="200">
                    </div>
                </div>
                <div class="col-md-5 col-sm-6 col-xs-12">
                    <div class="feature">
                        <div class="feature-box">
                            <div class="clearfix">
                                <div class="iconset">
                                    <span class="glyphicon glyphicon-cog icon"></span>
                                </div>
                                <div class="feature-content">
                                    <h4>Work with heart</h4>
                                    <p>Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in.</p>
                                </div>
                            </div>
                        </div>
                        <div class="feature-box">
                            <div class="clearfix">
                                <div class="iconset">
                                    <span class="glyphicon glyphicon-cog icon"></span>
                                </div>
                                <div class="feature-content">
                                    <h4>Reliable services</h4>
                                    <p>Donec vitae sapien ut libero venenatis faucibu. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt</p>
                                </div>
                            </div>
                        </div>
                        <div class="feature-box">
                            <div class="clearfix">
                                <div class="iconset">
                                    <span class="glyphicon glyphicon-cog icon"></span>
                                </div>
                                <div class="feature-content">
                                    <h4>Great support</h4>
                                    <p>Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    },
    async afterRender() {
        return `${await Header.afterRender()}`
      }
}
export default About;