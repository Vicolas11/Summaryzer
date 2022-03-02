from __future__ import unicode_literals
from flask import Flask,render_template,url_for,request, jsonify
from nltk_summarization import nltk_summarizer
import time

app = Flask(__name__)

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
			final_summary_nltk = nltk_summarizer(rawtext)
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