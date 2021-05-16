import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.DATABASE_URL || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', function() {
    console.log('We are connected MongoDB..!');
});

export default mongoose;
