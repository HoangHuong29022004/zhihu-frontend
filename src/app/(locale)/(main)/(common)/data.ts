import { CONTACT_INFO } from "@/data/app/app-info";

export interface IAboutData {
  id: number;
  title: string;
  content: string[] | string;
}

export const ABOUT_DATA: IAboutData[] = [
  {
    id: 1,
    title: "Giới thiệu về Thanh Nhạc Châu",
    content:
      "Thanh Nhạc Châu là nền tảng đọc truyện tranh và truyện chữ trực tuyến dành cho cộng đồng yêu thích văn học và nghệ thuật kể chuyện bằng hình ảnh. Chúng tôi mang đến cho bạn một không gian giải trí phong phú, nơi bạn có thể dễ dàng khám phá những tác phẩm hấp dẫn, từ truyện ngôn tình nhẹ nhàng, truyện kiếm hiệp hấp dẫn cho đến truyện tranh hành động kịch tính hay truyện hài hước giải trí.",
  },
  {
    id: 2,
    title: "Sứ mệnh của chúng tôi",
    content:
      "Thanh Nhạc Châu ra đời với mong muốn:\n- Kết nối người đọc và tác giả, tạo nên một cộng đồng chia sẻ và phát triển đam mê đọc – viết.\n- Mang đến nội dung phong phú, chất lượng và cập nhật liên tục mỗi ngày.\n- Hỗ trợ các tác giả trẻ giới thiệu tác phẩm đến với đông đảo bạn đọc.",
  },
  {
    id: 3,
    title: "Tính năng nổi bật",
    content:
      "- 📚 Đọc truyện chữ với giao diện dễ nhìn, mượt mà.\n- 🖼️ Truyện tranh với chất lượng hình ảnh sắc nét, load nhanh.\n- 🔍 Tìm kiếm dễ dàng theo thể loại, tác giả, hoặc từ khóa.\n- ❤️ Lưu truyện yêu thích và đánh dấu chương đang đọc.\n- 📝 Cho phép đăng tải truyện, tạo trang cá nhân cho tác giả.",
  },
  {
    id: 4,
    title: "Cộng đồng Thanh Nhạc Châu",
    content:
      "Tại Thanh Nhạc Châu, chúng tôi tin rằng mỗi câu chuyện đều xứng đáng được lắng nghe. Dù bạn là một độc giả trung thành hay một người mới bắt đầu hành trình sáng tác, Thanh Nhạc Châu luôn chào đón bạn.",
  },
  {
    id: 5,
    title: "Liên hệ",
    content:
      "Mọi thắc mắc, khiếu nại hoặc yêu cầu hỗ trợ vui lòng liên hệ:\nEmail: (needupdate)\nFanpage: (needupdate)",
  },
];

export const PRIVACY_DATA: IAboutData[] = [
  {
    id: 1,
    title: "Thông tin chúng tôi thu thập",
    content:
      "Khi bạn sử dụng Thanh Nhạc Châu, chúng tôi có thể thu thập một số thông tin cá nhân, bao gồm:\n- Họ tên, email, số điện thoại (khi đăng ký tài khoản).\n- Tên người dùng, ảnh đại diện, tiểu sử (nếu bạn chỉnh sửa hồ sơ cá nhân).\n- Thông tin về truyện bạn đọc, đánh giá, bình luận.\n- Dữ liệu kỹ thuật như địa chỉ IP, loại thiết bị, trình duyệt, thời gian truy cập.",
  },
  {
    id: 2,
    title: "Mục đích sử dụng thông tin",
    content:
      "Thanh Nhạc Châu sử dụng thông tin thu thập được nhằm mục đích:\n- Cung cấp và cải thiện dịch vụ.\n- Cá nhân hóa trải nghiệm đọc truyện.\n- Gửi thông báo liên quan đến tài khoản hoặc các cập nhật mới.\n- Đảm bảo an ninh và ngăn chặn hành vi gian lận.",
  },
  {
    id: 3,
    title: "Chia sẻ thông tin",
    content:
      "Thanh Nhạc Châu không bán hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba,ủy khi:\n- Có sự đồng ý rõ ràng từ bạn.\n- Được yêu cầu bởi cơ quan pháp luật có thẩm quyền.\n- Cần thiết để bảo vệ quyền lợi, tài sản hoặc sự an toàn của Thanh Nhạc Châu hoặc người dùng khác.",
  },
  {
    id: 4,
    title: "Lưu trữ & bảo mật",
    content:
      "Thông tin cá nhân của bạn được lưu trữ trên hệ thống máy chủ bảo mật của Thanh Nhạc Châu. Chúng tôi áp dụng nhiều biện pháp kỹ thuật và tổ chức để ngăn chặn truy cập trái phép, mất mát hoặc rò rỉ thông tin.",
  },
  {
    id: 5,
    title: "Quyền của người dùng",
    content:
      "Bạn có quyền:\n- Xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất cứ lúc nào.\n- Yêu cầu Thanh Nhạc Châu ngừng sử dụng hoặc xóa dữ liệu cá nhân của bạn.\n- Tắt nhận email thông báo từ hệ thống.",
  },
  {
    id: 6,
    title: "Cookie",
    content:
      "Thanh Nhạc Châu sử dụng cookie để ghi nhớ sở thích người dùng và cải thiện trải nghiệm sử dụng. Bạn có thể tùy chọn tắt cookie trong cài đặt trình duyệt, tuy nhiên điều này có thể ảnh hưởng đến một số chức năng của website.",
  },
  {
    id: 7,
    title: "Liên hệ",
    content:
      "Nếu bạn có bất kỳ câu hỏi nào liên quan đến chính sách quyền riêng tư, vui lòng liên hệ với chúng tôi qua:\nEmail: (Update Later)\nFanpage: (Update Later)\nHotline: (Update Later)",
  },
];

export const TERM_CONDITION_DATA: IAboutData[] = [
  {
    id: 1,
    title: "Tài khoản và Bảo mật",
    content: [
      "Người dùng phải đăng ký tài khoản để sử dụng đầy đủ tính năng (bình luận, lưu chương đã đọc, nạp Dâu,...).",
      "Bạn sẽ chịu trách nhiệm bảo mật tài khoản và thông tin cá nhân của mình.",
    ],
  },
  {
    id: 2,
    title: "Quyền và Trách nhiệm người dùng",
    content: [
      "Không được đăng tải nội dung vi phạm pháp luật, thuần phong mỹ tục hoặc cờ bạc.",
      "Không spam, phát tán mã độc hoặc thực hiện hành vi phá hoại hệ thống.",
      "Không được trích dẫn, sao chép truyện để đăng lại nơi khác khi không được phép.",
    ],
  },
  {
    id: 3,
    title: "Thanh toán và Đơn vị tiền tệ",
    content: [
      'Website sử dụng đơn vị tiền ảo "Dâu" để mua chương, gói audio hoặc dịch vụ khác.',
      "Tỉ giá và chính sách hoàn tiền sẽ được ghi rõ tại trang Nạp Dâu.",
      "Thanh toán không hoàn lại, trừ trường hợp hệ thống bị lỗi và được xác nhận bởi quản trị viên.",
    ],
  },
  {
    id: 4,
    title: "Vấn đề kỹ thuật",
    content: [
      "Website cố gắng vận hành ổn định, nhưng không chịu trách nhiệm khi có sự cố khách quan như mất kết nối, bảo trì, lỗi server...",
      "Người dùng nên báo lỗi qua email hoặc kênh hỗ trợ chính thức.",
    ],
  },
  {
    id: 5,
    title: "Thay đổi điều khoản",
    content: [
      "Website có quyền chỉnh sửa nội dung điều khoản bất kỳ lúc nào.",
      "Người dùng nên kiểm tra lại định kỳ để cập nhật thay đổi.",
    ],
  },
  {
    id: 6,
    title: "Quy định sử dụng",
    content: [
      "Người dùng không được tải về hoặc chia sẻ trái phép file audio ra bên ngoài nền tảng.",
      "Vi phạm sẽ bị xử lý: cảnh cáo, khóa tài khoản…",
    ],
  },
  {
    id: 7,
    title: "Xử lý vi phạm",
    content: [
      "Tài khoản vi phạm sẽ bị cảnh cáo, khóa tạm thời hoặc xóa vĩnh viễn tùy mức độ.",
      "Website có quyền từ chối phục vụ nếu người dùng không tuân thủ quy định.",
    ],
  },
  {
    id: 8,
    title: "Liên hệ",
    content: `Mọi thắc mắc hoặc yêu cầu hỗ trợ vui lòng liên hệ:\n\n📧 Email: ${CONTACT_INFO.email.primary}\n📱 Fanpage: ${CONTACT_INFO.fanPage.primary}`,
  },
];

export const APP_POLICY_DATA: IAboutData[] = [
  {
    id: 1,
    title: "Quy định chung",
    content: [
      "Sử dụng tiếng việt chuẩn, có dấu cho tất cả các chương trong bản viết/ edit/ dịch.",
      "Chỉ được gửi truyện do chính các bạn sáng tác/edit/dịch, không reup/copy từ các bản edit khác đã có từ các nguồn trên Internet. Thanh Nhạc Châu xin phép KHÔNG thanh toán và trả lại những bản edit/dịch có dấu hiệu copy và sẽ không dùng bản đó.",
      "Trước khi edit/dịch một bộ truyện nào đó, các bạn vui lòng gửi link bản raw hoặc link bản convert về fanpage Thanh Nhạc Châu để được duyệt truyện, tránh trường hợp làm trùng truyện với nhau.",
      "Lưu ý: Những truyện chưa gửi link để duyệt nhưng đã edit/dịch và bị trùng thì Thanh Nhạc Châu không nhận bản edit/ dịch của team chưa gửi link.",
      "Đối với các team edit/dịch mới, các bạn cần phải gửi link raw hoặc link convert về fanpage để chờ duyệt truyện. Sau đó làm 3 chương gửi về fanpage để Admin đánh giá chất lượng và xem xét mức lương.",
      "Truyện chỉ được đăng tải duy nhất trên website Thanh Nhạc Châu, trong trường hợp phát hiện truyện của team đang hợp tác đăng trên các nền tảng khác thì sẽ có biện pháp xử lý.",
      "Nếu quá 30 ngày không liên lạc được với team edit/dịch, Thanh Nhạc Châu sẽ huỷ hợp tác và chuyển những bộ truyện của team đang làm dở về cho các team khác hỗ trợ hoàn thành.",
      "Website có quyền điều chỉnh nội quy bất cứ lúc nào. Các thay đổi sẽ được thông báo công khai.",
    ],
  },
  {
    id: 2,
    title: "Quy định về truyện",
    content: [
      "Không dịch hoặc edit những truyện, tác phẩm xuyên tạc, đả kích, gây hiểu lầm làm sai lệch tới chính trị, tôn giáo hoặc các vấn đề liên quan tới chính trị, tôn giáo. Những bộ truyện nào vi phạm sẽ lập tức bị xóa.",
      "Chỉ nhận truyện tối đa 300 chương, tối thiểu 30 chương, raw hoàn (trường hợp đã hợp tác lâu sẽ dựa trên bản edit/dịch và tốc độ hoàn thành một bộ trước đó để cân nhắc cho làm bộ dài hơn)",
      "Chưa có bản edit/dịch trên bất cứ nền tảng nào.",
      "Bản dịch hạn chế sai chính tả, tên nhân vật, xưng hô phù hợp với thể loại truyện, không lậm convert hoặc dùng google dịch.",
      "Mỗi team chỉ edit/dịch tối đa song song 02 truyện.",
      "Thanh Nhạc Châu cần các team hỗ trợ cho một bìa và một mock up truyện.",
      'Không edit/dịch "Tác giả có lời muốn nói" nếu không liên quan đến nội dung truyện.',
    ],
  },
  {
    id: 3,
    title: "Quy định về cách trình bày",
    content: [
      "Mở đầu truyện yêu cầu phải trình bày theo hình thức sau:",
      "Truyện phải được cài mục lục cho từng chương, trình bày tên tiêu đề chương vui lòng viết in hoa.",
      "Định dạng chương truyện: font chữ Times new roman, cỡ chữ 14, giãn cách 1,15 và cài mục lục chương, ngắt trang (bấm tổ hợp phím CTRL + ENTER để ngắt trang). Thanh Nhạc Châu sẽ trả lại những bản edit/dịch không trình bày đúng hình thức.",
    ],
  },
  {
    id: 4,
    title: "Chế độ lương - thưởng",
    content: [
      "<b>Đối với Thanh Nhạc Châu:</b>",
      "Hiện tại TNC có thể hỗ trợ 10k/1000view cho những người dùng tự đăng truyện trên web. Có thể rút sau khi đạt tối thiểu 50k và tối đa 100k view.",
      "Lưu ý: Truyện Thanh Nhạc Châu không được thu phí.",
      "Đối với truyện dài:",
      "Đối với tác giả/ edit/team hợp tác tự đăng truyện trên web",
      "TNC Tuyển tác giả/ edit solo/team edit hợp tác đăng truyện (Chấp nhận mọi thể loại trừ sắc [18+])",
      "Chia 7:3 nếu bộ truyện đó đã được đăng trên nhiều web với điều kiện:",
      "Những nơi đăng bộ truyện đó phải set VIP",
      "Khi đăng bên Thanh Nhạc Châu không được chênh lệch quá 3 chương so với các web đã đăng. Ví dụ: Đăng trên web A tới chương 10 thì đăng ở Thanh Nhạc Châu tối thiểu phải tới chương 7.",
      "Đối với bộ truyện trên 200 chương, Thanh Nhạc Châu sẽ hỗ trợ PR miễn phí.",
      "Lưu ý: Khi có người mua tiền vẫn sẽ được nhận cho tới khi truyện bị gỡ khỏi web.",
      "Hình thức thanh toán:",
      "Đăng ký tên tác giả/team/editor - Leader - Thông tin liên lạc (thực tế), Thông tin tài khoản ngân hàng.",
      "Tên tác giả/team/editor: Thanh Nhac Chau (Tùy theo tên mọi người muốn)",
      "Leader: Nguyễn Văn A (Tên của boss)",
      "Thông tin liên lạc: Số điện thoại dùng để trao đổi qua Zalo",
      "Tài khoản ngân hàng: 0123456789 - BIDV - NGUYEN VAN A (gồm stk - tên ngân hàng - tên chủ tài khoản) - Trường hợp ghi sai stk (lỗi do bên tác giả/editor/team) dẫn đến chuyển khoản nhầm thì editor/ team tự chịu.",
    ],
  },
  {
    id: 5,
    title: "Hình thức xử phạt",
    content: [
      "Đối với tất cả chương truyện vi phạm dưới mọi hình thức, lần đầu sẽ nhắc nhở.",
      "Lần thứ hai TNC sẽ ngừng hợp tác.",
    ],
  },
];
