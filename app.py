
from flask import Flask,render_template, request, jsonify
import time, textrank

app = Flask(__name__)

def customTextRank(raw_text, sum_len=100):
    textrank.setup_environment()
    summary = textrank.extract_sentences(raw_text, summary_length=sum_len)
    return summary

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/compare_summary')
def compare_summary():
	return render_template('compare_summary.html')


@app.route('/summerize',methods=['GET','POST'])
def summerizer():
	try:		
		start = time.time()
		if request.method == 'POST':
			rawtext = request.json['rawtext']
			sumnum = request.json['sumnum'] or 100
			final_summary_nltk = customTextRank(rawtext, int(sumnum))
			# final_summary_nltk = nltk_summarizer(rawtext)
			len_summary = len(f'{final_summary_nltk}'.split(" "))
			end = time.time()
			final_time = end-start
		return jsonify({'final_summary_nltk': final_summary_nltk, 'final_time': f'{final_time:.3f}', "len_words": f'{len_summary}'})
	except Exception as e:
		print("Error", e)
		return jsonify({'status': f'{e}'})

@app.route('/about')
def about():
	return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=True)