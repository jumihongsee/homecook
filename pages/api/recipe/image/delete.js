import aws from 'aws-sdk';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    aws.config.update({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
      region: 'ap-northeast-2',
      signatureVersion: 'v4',
    });

    const src = req.body.src;
    console.log(src);

    if (!src) {
      return res.status(400).json({ message: '삭제 key 없음' });
    }

    const s3 = new aws.S3();
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: src,
    };

    try {
      await s3.deleteObject(params).promise();
      return res.status(200).json({ message: '삭제 성공' });
    } catch (error) {
      console.error('삭제 실패:', error);
      return res.status(500).json({ message: '삭제 실패' });
    }
  } else {
    return res.status(405).json({ message: 'DELETE 요청만 허용' });
  }
}
